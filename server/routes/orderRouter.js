const express = require('express');
const orderRouter = express.Router();
const { validateOrder, validateCheckOrder, handleValidationErrors } = require('../validation/orderValidation');
const { addOrder, getOrders, editOrder } = require('../controller/orderController');

orderRouter.get('/', getOrders);
orderRouter.post('/:productId', validateOrder, handleValidationErrors, addOrder);
orderRouter.put('/:id', validateCheckOrder, handleValidationErrors, editOrder);

module.exports = orderRouter;