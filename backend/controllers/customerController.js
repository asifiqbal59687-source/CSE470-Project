const Customer = require('../models/customerModel');

exports.getCustomerHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const history = await Customer.getPurchaseHistory(id);
        res.status(200).json(history);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch customer history" });
    }
};