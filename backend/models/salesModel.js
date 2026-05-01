const db = require('../config/db');

const Sales = {
    recordSale: async (amount, cost, customerId, productId, quantity, price) => {
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
