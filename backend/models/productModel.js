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
    },

    updateProductInfo: async (id, cost_price, selling_price, category_id) => {
        const query = `
            UPDATE products 
            SET cost_price = ?, selling_price = ?, category_id = ?
            WHERE id = ?
        `;
        await db.execute(query, [cost_price, selling_price, category_id, id]);
    },

    getCategories: async () => {
        const [rows] = await db.execute('SELECT * FROM product_categories');
        return rows;
    },
    
    getAllProducts: async () => {
        const query = `
            SELECT p.*, c.name as category_name 
            FROM products p
            LEFT JOIN product_categories c ON p.category_id = c.id
        `;
        const [rows] = await db.execute(query);
        return rows;
    }
};

module.exports = Product;