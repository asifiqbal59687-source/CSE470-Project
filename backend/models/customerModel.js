const db = require('../config/db');

const Customer = {
    
    getMaxId: async () => {
        const [rows] = await db.execute('SELECT MAX(id) as maxId FROM customers');
        return rows[0].maxId || 1;
    },

    getPurchaseHistory: async (customerId) => {
        const query = `
            SELECT s.id, s.amount, s.sale_date, c.name as customer_name
            FROM sales s
            JOIN customers c ON s.customer_id = c.id
            WHERE c.id = ?
            ORDER BY s.sale_date DESC`;
        const [rows] = await db.execute(query, [customerId]);
        return rows;
    },

    getMonthlyAnalytics: async () => {
        const query = `
            SELECT 
                DATE_FORMAT(sale_date, '%Y-%m') AS month,
                SUM(amount) AS total_revenue,
                SUM(amount - cost) AS total_profit
            FROM sales
            GROUP BY month
            ORDER BY month ASC`;
        const [rows] = await db.execute(query);
        return rows;
    },

    getLowMarginSales: async (thresholdPercent) => {
        const query = `
            SELECT s.id, s.amount, s.cost, 
                   ((s.amount - s.cost) / s.amount * 100) AS margin_percentage,
                   c.name AS customer_name
            FROM sales s
            JOIN customers c ON s.customer_id = c.id
            WHERE ((s.amount - s.cost) / s.amount * 100) < ?
            ORDER BY margin_percentage ASC`;
        const [rows] = await db.execute(query, [thresholdPercent]);
        return rows;
    }
};

module.exports = Customer;