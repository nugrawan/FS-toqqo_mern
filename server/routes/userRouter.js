const express = require('express');
const userRouter = express.Router();
const { register, login, logout, profile, resetPassword } = require('../controller/userController');
const { validateUserRegister, validateUserLogin, handleValidationErrors } = require('../validation/userValidation');

userRouter.get('/', profile);
userRouter.post('/register', validateUserRegister, handleValidationErrors, register);
userRouter.post('/login', validateUserLogin, handleValidationErrors, login);
userRouter.put('/password', resetPassword);
userRouter.delete('/', logout);


module.exports = userRouter;