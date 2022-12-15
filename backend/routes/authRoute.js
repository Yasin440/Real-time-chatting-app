const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controller/authController');

router.post('/register-user', registerUser);
router.post('/login-user', loginUser);

module.exports = router;