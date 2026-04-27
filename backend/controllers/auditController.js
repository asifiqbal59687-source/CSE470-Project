const Audit = require('../models/auditModel');

exports.getLogs = async (req, res) => {
    try {
        const logs = await Audit.getAll();
        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch audit logs" });
    }
};