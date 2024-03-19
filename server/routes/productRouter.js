const express = require('express');
const productRouter = express.Router();
const { addProduct, getProducts, editProduct, deleteProduct } = require('../controller/productController');
const { validateProduct, handleValidationErrors } = require('../validation/productValidation');

productRouter.get('/', getProducts);
productRouter.post('/', validateProduct, handleValidationErrors, addProduct);
productRouter.put('/:id', validateProduct, handleValidationErrors, editProduct);
productRouter.delete('/:id', deleteProduct);


module.exports = productRouter;