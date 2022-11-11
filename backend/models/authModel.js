const { model, Schema } = require('mongoose');

const registerScheme = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = model('user', registerScheme);