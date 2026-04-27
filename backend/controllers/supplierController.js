const Supplier = require('../models/supplierModel');

exports.getSuppliers = async (req, res) => {
    try {
        const data = await Supplier.getAll();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch suppliers" });
    }
};