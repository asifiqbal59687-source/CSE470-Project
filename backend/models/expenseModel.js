const db = require('../config/db');

const Expense = {
    recordExpense: async (category_id, amount, expense_date, description) => {
        const query = `
            INSERT INTO expenses (category_id, amount, expense_date, description)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [category_id, amount, expense_date, description]);
        return result.insertId;
    },

    getCategories: async () => {
        const [rows] = await db.execute('SELECT * FROM expense_categories');
        return rows;
    },

    getMonthlyExpenses: async () => {
        const query = `
            SELECT DATE_FORMAT(expense_date, '%Y-%m') as month, SUM(amount) as total_expenses
            FROM expenses
            GROUP BY DATE_FORMAT(expense_date, '%Y-%m')
            ORDER BY month DESC LIMIT 12
        `;
        const [rows] = await db.execute(query);
        return rows;
    },

    getTopCategories: async () => {
        const query = `
            SELECT c.name, SUM(e.amount) as total
            FROM expenses e
            JOIN expense_categories c ON e.category_id = c.id
            GROUP BY c.id
            ORDER BY total DESC LIMIT 5
        `;
        const [rows] = await db.execute(query);
        return rows;
    }
};

module.exports = Expense;
