const db = require('../config/db');

const Sales = {
    recordSale: async (amount, cost, customerId, productId, quantity, price, productName) => {
        try {
            if (productName && productId) {
                await db.execute(
                    'INSERT IGNORE INTO products (id, product_name, cost_price, selling_price, category_id, stock_quantity, min_threshold) VALUES (?, ?, ?, ?, 1, 100, 10)',
                    [productId, productName, cost/quantity, price]
                );
            }
            if (customerId) {
                await db.execute(
                    'INSERT IGNORE INTO customers (id, name) VALUES (?, ?)',
                    [customerId, 'Customer ' + customerId]
                );
            }
        } catch (e) {
            console.error("Ignored entity creation error:", e);
        }

        const query = `
            INSERT INTO sales (amount, cost, customer_id, product_id, quantity, price)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [amount, cost, customerId, productId, quantity, price]);
        return result.insertId;
    },
    
    // Feature 5: Calculate daily and monthly revenue
    getRevenueMetrics: async () => {
        const dailyQuery = `
            SELECT DATE(sale_date) as date, SUM(amount) as revenue
            FROM sales
            GROUP BY DATE(sale_date)
            ORDER BY date DESC LIMIT 30
        `;
        const monthlyQuery = `
            SELECT DATE_FORMAT(sale_date, '%Y-%m') as month, SUM(amount) as revenue
            FROM sales
            GROUP BY DATE_FORMAT(sale_date, '%Y-%m')
            ORDER BY month DESC LIMIT 12
        `;
        
        const [daily] = await db.execute(dailyQuery);
        const [monthly] = await db.execute(monthlyQuery);
        return { daily, monthly };
    }
};

module.exports = Sales;
