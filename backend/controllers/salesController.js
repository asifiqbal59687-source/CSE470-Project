const Sales = require('../models/salesModel');
const Audit = require('../models/auditModel');

exports.recordSale = async (req, res) => {
    try {
        const { amount, cost, customer_id, product_id, quantity, price, product_name } = req.body;
        
        if (!amount || !cost || !customer_id || !product_id || !quantity || !price) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const saleId = await Sales.recordSale(amount, cost, customer_id, product_id, quantity, price, product_name);
        
        // Log to audit
        await Audit.logEvent('INSERT', 'sales', `Recorded sale ${saleId} for customer ${customer_id}`);

        res.status(201).json({ message: "Sale recorded successfully", saleId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to record sale" });
    }
};

exports.getRevenue = async (req, res) => {
    try {
        const metrics = await Sales.getRevenueMetrics();
        res.status(200).json(metrics);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get revenue metrics" });
    }
};
