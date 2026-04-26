const db = require('../config/db');

const Product = {
    // Feature: Low Stock Alerts (FR-9)
    getLowStockAlerts: async () => {
        const query = `
            SELECT id, product_name, stock_quantity, min_threshold 
            FROM products 
            WHERE stock_quantity < min_threshold`;
        const [rows] = await db.execute(query);
        return rows;
    }
};

module.exports = Product;