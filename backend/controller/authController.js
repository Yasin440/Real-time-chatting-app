const formidable = require('formidable');
const validator = require('validator');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registerModal = require('../models/authModel');

module.exports.registerUser = (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        const { userName, email, password, confirmPassword } = fields;
        const { image } = files;
        let error = {};
        if (!userName) {
            error = { ...error, userName: 'userName is required' };
        }
        if (!email) {
            error = { ...error, email: 'email is required' };
        }
        if (!password) {
            error = { ...error, password: 'password is required' };
        }
        if (!confirmPassword) {
            error = { ...error, confirmPassword: 'confirmPassword is required' };
        }
        if (Object.keys(files).length <= 0) {
            error = { ...error, image: 'profile img is required' }
        }
        if (image && image.size > 2e+6) {
            error = { ...error, imageSize: 'Image size will in 2MB' }
        }
        if (email && !validator.isEmail(email)) {
            error = { ...error, email: 'please provide a valid email' };
        }
        if (password && password.length < 6) {
            error = { ...error, password: 'password at lest 6 character' };
        }
        if (password && confirmPassword && password !== confirmPassword) {
            error = { ...error, message: 'mismatch password and confirmPassword' }
        }
        if (Object.keys(error).length > 0) {
            res.status(400).json({ error });
        }
        else if (Object.keys(error).length === 0) {
            //generate unique image name
            const oldImgName = files.image.originalFilename;
            const randomNum = Math.floor(Math.random() * 99999);
            const newImgName = randomNum + oldImgName;
            files.image.originalFilename = newImgName;
            const imgPath = __dirname + `./../../public/image/${files.image.originalFilename}`;
            try {
                //find is user already exist
                const haveUser = await registerModal.findOne({ email });
                if (haveUser) {
                    res.status(404).json({ error: { message: 'email already existed' } });
                } else if (!haveUser) {
                    fs.copyFile(files.image.filepath, imgPath, async (err) => {
                        if (!err) {
                            const createUser = await registerModal.create({
                                userName,
                                email,
                                password: await bcrypt.hash(password, 10),
                                image: newImgName
                            })
                            if (createUser) {
                                const { _id, email, userName, image, createdAt } = createUser;
                                const token = jwt.sign(
                                    { id: _id, email, userName, image, createdAt },
                                    process.env.SECRET_JWT,
                                    { expiresIn: process.env.EXPIRE_JWT_IN }
                                );
                                const option = {
                                    expires: new Date(Date.now() + process.env.COOKIE_EXP * 24 * 3600000)
                                }
                                res.status(200).cookie('authToken', token, option).json({ success: { message: 'Registration successful' }, token });
                            }
                        } else if (err) {
                            res.status(500).json({ error: { error: 'internal server error' } });
                        }
                    })
                }

            } catch (error) {
                res.status(500).json({ error: { error: 'internal server error' } });
            }
        }
    })
}
module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    let error = {};
    if (!email) {
        error = { ...error, email: "Please provide an email" }
    }
    if (!password) {
        error = { ...error, password: "Please provide an password" }
    }
    if (email && !validator.isEmail(email)) {
        error = { ...error, email: "please provide a valid email" };
    }
    if (Object.keys(error).length > 0) {
        res.status(400).json({ error });
    } else if (Object.keys(error).length <= 0) {
        try {
            const findUser = await registerModal.findOne({ email }).select('+password');
            if (findUser) {
                const { _id, userName, email, image, createdAt } = findUser;
                const matchPassword = bcrypt.compare(password, findUser.password);
                if (matchPassword) {
                    const token = jwt.sign(
                        { id: _id, email, userName, image, createdAt },
                        process.env.SECRET_JWT,
                        { expiresIn: process.env.EXPIRE_JWT_IN }
                    );
                    const option = {
                        expires: new Date(Date.now() + process.env.COOKIE_EXP * 24 * 3600000)
                    };
                    res.status(200).cookie('authToken', token, option).json({ success: { message: "Login successful" }, token });
                } else if (!matchPassword) {
                    res.status(400).json({ error: { message: 'Password not valid' } });
                }
            } else {
                res.status(404).json({ error: { message: "User not found" } });
            }
        } catch (err) {
            res.status(500).json({ error: { message: 'Internal server error' } });
        }
    }
}