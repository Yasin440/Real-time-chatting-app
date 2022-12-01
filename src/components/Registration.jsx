import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerNewUser } from '../store/actions/authAction';
import { useAlert } from 'react-alert';

const Registration = ({ history }) => {
    const dispatch = useDispatch()
    const [isBlind, setIsBlind] = useState('');
    const [viewLoadedImg, setViewLoadedImg] = useState('');
    const initialInput = {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        image: ''
    }
    const [initial, setInitial] = useState(initialInput)
    const alert = useAlert();
    const { loading, authentication, success, error, myInfo } = useSelector(state => state.authReducer);
    // const history=useHistore();

    useEffect(() => {
        if (success) {
            alert.success(success);
            setInitial(initialInput);
        }
        if (authentication) {
            history.push('/');
        }
        if (error.message) {
            alert.error(error.message);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success, error])
    console.log(myInfo);
    //handle inputValue
    const handleInput = e => {
        setInitial({
            ...initial,
            [e.target.name]: e.target.value
        })
    }
    const handleFile = e => {
        if (e.target.files.length !== 0) {
            setInitial({
                ...initial,
                [e.target.name]: e.target.files[0]
            })
        };
        const fileObject = new FileReader();
        fileObject.onload = () => {
            setViewLoadedImg(fileObject.result)
        }
        fileObject.readAsDataURL(e.target.files[0]);
    }
    // ===handle registration=== // 
    const handleRegister = e => {
        e.preventDefault();
        // const { userName, email, password, confirmPassword, image } = initial;
        const formData = new FormData();
        //append data into form data with map
        Object.keys(initial).map(key =>
            formData.append(key, initial[key])
        )
        // formData.append('userName', userName);
        // formData.append('email', email);
        // formData.append('password', password);
        // formData.append('confirmPassword', confirmPassword);
        // formData.append('image', image);

        dispatch(registerNewUser(formData));
    }
    //handle panda eye rotation
    $(document).on("mousemove", function (event) {
        var dw = $(document).width() / 15;
        var dh = $(document).height() / 15;
        var x = event.pageX / dw;
        var y = event.pageY / dh;
        $(".eye-ball").css({
            width: x,
            height: y
        });
    });
    //handle invalid data error
    // $(".btn").click(function () {
    //     $("form").addClass("wrong-entry");
    //     setTimeout(function () {
    //         $("form").removeClass("wrong-entry");
    //     }, 3000);
    // });
    return (
        <div className='register'>
            <div className="panda">
                <div className="ear"></div>
                <div className="face">
                    <div className="eye-shade"></div>
                    <div className="eye-white">
                        <div className="eye-ball"></div>
                    </div>
                    <div className="eye-shade rgt"></div>
                    <div className="eye-white rgt">
                        <div className="eye-ball"></div>
                    </div>
                    <div className="nose"></div>
                    <div className="mouth"></div>
                </div>
                <div className="body"> </div>

            </div>
            <form
                className={isBlind}
                onSubmit={handleRegister}
                encType="multipart/form-data"
            >
                <div className="hand"></div>
                <div className="hand rgt"></div>
                <div className="foot">
                    <div className="finger"></div>
                </div>
                <div className="foot rgt">
                    <div className="finger"></div>
                </div>
                <h1>Registration</h1>
                <div className="form-group">
                    <input
                        value={initial.userName}
                        onChange={handleInput}
                        // required="required"
                        type="text"
                        className="form-control"
                        name="userName"
                    />
                    <label className="form-label">Username</label>
                    {error.userName && <span className='errorMessage'>{error.userName}</span>}
                </div>
                <div className="form-group">
                    <input
                        value={initial.email}
                        onChange={handleInput}
                        // required="required"
                        type="email"
                        className="form-control"
                        name="email"
                    />
                    <label className="form-label">Email</label>
                    {error.email && <span className='errorMessage'>{error.email}</span>}
                </div>
                <div className="form-group">
                    <input
                        value={initial.password}
                        onChange={handleInput}
                        id="password"
                        type="password"
                        // required="required"
                        className="form-control"
                        name="password"
                        onFocus={() => setIsBlind('up')}
                        onBlur={() => setIsBlind('')}
                    />
                    <label className="form-label">Password</label>
                    {error.password && <span className='errorMessage'>{error.password}</span>}
                </div>
                <div className="form-group">
                    <input
                        value={initial.confirmPassword}
                        onChange={handleInput}
                        id="confirmPassword"
                        type="password"
                        // required="required"
                        className="form-control"
                        name="confirmPassword"
                        onFocus={() => setIsBlind('up')}
                        onBlur={() => setIsBlind('')}
                    />
                    <label className="form-label">Confirm Password</label>
                    {error.confirmPassword && <span className='errorMessage'>{error.confirmPassword}</span>}
                </div>
                <div className="form-group">
                    <div className="imgBox">
                        <div className="img">
                            {viewLoadedImg &&
                                <img src={viewLoadedImg} alt="profile" />}
                        </div>
                        <div className="file">
                            <label htmlFor="profile_img">Select Profile</label>
                            <input onChange={handleFile} className='form-group' id='profile_img' type="file" name="image" />
                        </div>
                    </div>
                    {error.image && <span className='errorMessage'>{error.image}</span>}
                </div>
                <button className="btn" type="submit">Sign up </button>
                <p className="alert">Invalid Credentials..!!</p>
                <div className='toggleAuth'>
                    <span>Already have an Account?
                        <Link to='/chat/login'>Login</Link>
                    </span></div>
            </form>
        </div>
    );
};

export default Registration;