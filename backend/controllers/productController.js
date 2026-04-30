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