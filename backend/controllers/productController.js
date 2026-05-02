const Product = require('../models/productModel');

exports.getLowStockAlerts = async (req, res) => {
    try {
        const alerts = await Product.getLowStockAlerts();
        res.status(200).json(alerts);
    } catch (err) {
        console.error("Inventory Error:", err);
        res.status(500).json({ error: "Failed to fetch stock alerts" });
    }
};

exports.updateProductInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { cost_price, selling_price, category_id } = req.body;

        if (cost_price === undefined || selling_price === undefined || category_id === undefined) {
            return res.status(400).json({ error: "cost_price, selling_price, and category_id are required fields" });
        }

        await Product.updateProductInfo(id, cost_price, selling_price, category_id);
        res.status(200).json({ message: "Product updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update product" });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Product.getCategories();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch categories" });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};