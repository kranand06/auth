const express = require('express');
const { signup, login } = require('../Controllers/authController');
const { signupValidation, loginValidation } = require('../Middlewares/authValidation.js');

const router = express.Router();

// Routes
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

module.exports = router;