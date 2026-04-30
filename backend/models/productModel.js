const db = require('../config/db');

const Product = {
    getLowStockAlerts: async () => {
        // The LEFT JOIN now uses the exact column names from your database!
        const query = `
            SELECT 
                p.id, 
                p.product_name, 
                p.stock_quantity, 
                p.min_threshold,
                s.supplier_name AS supplier_name, 
                s.phone AS supplier_contact       
            FROM products p
            LEFT JOIN suppliers s ON p.supplier_id = s.id
            WHERE p.stock_quantity < p.min_threshold
        `;
        const [rows] = await db.execute(query); 
        return rows;
    }
};

module.exports = Product;