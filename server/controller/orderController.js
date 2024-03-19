const Order = require('../models/OrdersModel');
const jwt = require('jsonwebtoken');
const Products = require('../models/ProductsModel');
const secret = process.env.SECRET;

const addOrder = async (req, res) => {
    const { quantity } = req.body;
    const { productId } = req.params;

    try {
        jwt.verify(req.cookies.token, secret, async (err, decoded) => {
            const productAvailable = await Products.findOne({ where: { id: productId } });
            if (productAvailable === null) {
                return res.status(400).json({
                    success: false,
                    message: "Product not found"
                })
            }
            if (productAvailable.quantity === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Product is not available"
                })
            }

            if (productAvailable.quantity < quantity) {
                return res.status(400).json({
                    success: false,
                    message: "Quantity id not enough"
                })
            }

            const newQuantity = productAvailable.quantity - quantity;
            const order = await Order.create({
                userId: decoded.userId,
                total: productAvailable.price * quantity,
                quantity,
                productId
            });
            await Products.update({ quantity: newQuantity }, { where: { id: productId } });

            res.status(200).json({
                success: true,
                message: "Order success",
                order
            });
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

const getOrders = async (req, res) => {
    try {
        jwt.verify(req.cookies.token, secret, async (err, decoded) => {
            const orders = await Order.findAll({ where: { userId: decoded.userId } });
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully",
                total: orders.length,
                orders
            })
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

const editOrder = async (req, res) => {
    const { isProcessed } = req.body;
    const { id } = req.params;
    try {
        jwt.verify(req.cookies.token, secret, async (err, decoded) => {
            const orderUser = await Order.findOne({ where: { id } });
            if (decoded.userId != orderUser.userId) {
                return res.status(400).json({
                    success: false,
                    message: "Unauthorized"
                })
            }
            const order = await Order.update({ isProcessed }, { where: { id } });
            if (!order) {
                return res.status(400).json({
                    success: false,
                    message: "Order not found"
                })
            }
            res.status(200).json({
                success: true,
                message: "Order updated successfully"
            })
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}


module.exports = { addOrder, getOrders, editOrder }