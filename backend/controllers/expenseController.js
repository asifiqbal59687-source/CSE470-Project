const Expense = require('../models/expenseModel');
const Audit = require('../models/auditModel');

exports.recordExpense = async (req, res) => {
    try {
        const { category_id, amount, expense_date, description } = req.body;
        if (!category_id || !amount || !expense_date) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        
        const expenseId = await Expense.recordExpense(category_id, amount, expense_date, description);
        await Audit.logEvent('INSERT', 'expenses', `Recorded expense ${expenseId} for ${amount}`);

        res.status(201).json({ message: "Expense recorded successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to record expense" });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const cats = await Expense.getCategories();
        res.status(200).json(cats);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch categories" });
    }
};

exports.getMonthlyExpenses = async (req, res) => {
    try {
        const data = await Expense.getMonthlyExpenses();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch monthly expenses" });
    }
};

exports.getTopCategories = async (req, res) => {
    try {
        const data = await Expense.getTopCategories();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch top categories" });
    }
};
