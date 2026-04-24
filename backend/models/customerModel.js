const db = require('../config/db');

const Customer = {
    getPurchaseHistory: async (customerId) => {
        const query = `
            SELECT s.id, s.amount, s.sale_date, c.name as customer_name
            FROM sales s
            JOIN customers c ON s.customer_id = c.id
            WHERE c.id = ?
            ORDER BY s.sale_date DESC`;
        const [rows] = await db.execute(query, [customerId]);
        return rows;
    }
};

module.exports = Customer;