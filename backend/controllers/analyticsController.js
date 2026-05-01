const Analytics = require('../models/analyticsModel');

exports.getDashboardData = async (req, res) => {
    try {
        const metrics = await Analytics.getAdvancedMetrics();
        const productMargins = await Analytics.getProductMargins();
        const trends = await Analytics.getSalesTrends();
        
        res.status(200).json({
            metrics,
            productMargins,
            trends
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch analytics data" });
    }
};
