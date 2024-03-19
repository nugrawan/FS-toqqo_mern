const Products = require('../models/ProductsModel');

const addProduct = async (req, res) => {
    const { name, price, quantity } = req.body;
    try {
        const product = await Products.create({
            name,
            price,
            quantity
        })
        res.status(200).json({
            success: true,
            message: "Product added successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Products.findAll();
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            total: products.length,
            products
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not Found",
            error
        })
    }
}

const editProduct = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        await Products.update({
            name,
            price,
            quantity
        }, { where: { id: req.params.id } })
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            updatedProduct: {
                name,
                price,
                quantity
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Can not edit product",
            error
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        await Products.destroy({ where: { id: req.params.id } })
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Can not delete product",
            error
        })
    }
}

module.exports = {
    addProduct,
    getProducts,
    editProduct,
    deleteProduct
}