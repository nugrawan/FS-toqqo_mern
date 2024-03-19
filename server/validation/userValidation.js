const { body, validationResult } = require('express-validator');

const validateUserRegister = [
    body('firstName').notEmpty().isString().withMessage('Name harus berupa string atau tidak boleh kosong'),
    body('lastName').notEmpty().isString().withMessage('Name harus berupa string atau tidak boleh kosong'),
    body('username').notEmpty().isString().isLength({ min: 2 }).withMessage('Username minimal terdiri dari 2 karakter'),
    body('password').notEmpty().isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
];

const validateUserLogin = [
    body('username').notEmpty().isString().isLength({ min: 2 }).withMessage('Username minimal terdiri dari 2 karakter'),
    body('password').notEmpty().isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validateUserRegister, validateUserLogin, handleValidationErrors };
