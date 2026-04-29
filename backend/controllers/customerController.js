const Customer = require('../models/customerModel');


exports.getMaxCustomerValue = async (req, res) => {
    try {
        const maxId = await Customer.getMaxId();
        res.status(200).json({ maxId });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch max ID" });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const history = await Customer.getPurchaseHistory(req.params.id);
        res.status(200).json(history);
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
};

exports.getAnalytics = async (req, res) => {
    try {
        const data = await Customer.getMonthlyAnalytics();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
};

exports.getLowMarginAlerts = async (req, res) => {
    try {
        const threshold = 15;
        const lowMargins = await Customer.getLowMarginSales(threshold);
        res.status(200).json(lowMargins);
    } catch (err) {
        res.status(500).json({ error: "Failed to detect low margins" });
    }
};