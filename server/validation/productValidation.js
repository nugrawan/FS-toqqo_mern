const { body, validationResult } = require('express-validator');

const validateProduct = [
    body('name').notEmpty().isString().withMessage('Username harus berupa string atau tidak boleh kosong'),
    body('price').notEmpty().isNumeric().withMessage('price tidak boleh kosong'),
    body('quantity').notEmpty().isNumeric().withMessage('Quantity tidak boleh kosong'),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0] });
    }
    next();
};

module.exports = { validateProduct, handleValidationErrors };
