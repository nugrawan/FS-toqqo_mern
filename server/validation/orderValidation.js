const { body, validationResult } = require('express-validator');


const validateOrder = [
    body('quantity').notEmpty().isNumeric().withMessage('Quantity tidak boleh kosong'),
];

const validateCheckOrder = [
    body('isProcessed').notEmpty().isBoolean().withMessage('isProcessed tidak boleh kosong'),
];


const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0] });
    }
    next();
};

module.exports = { validateOrder, validateCheckOrder, handleValidationErrors };
