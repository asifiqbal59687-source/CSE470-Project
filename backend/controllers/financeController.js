const Sales = require('../models/salesModel');
const Expense = require('../models/expenseModel');

exports.getFinancialSummary = async (req, res) => {
    try {
        const { monthly: revenueData } = await Sales.getRevenueMetrics();
        const expenseData = await Expense.getMonthlyExpenses();

        // Merge them into a single array for the frontend
        const summary = [];
        
        // Map by month
        const revenueMap = new Map();
        revenueData.forEach(r => revenueMap.set(r.month, parseFloat(r.revenue)));
        
        const expenseMap = new Map();
        expenseData.forEach(e => expenseMap.set(e.month, parseFloat(e.total_expenses)));

        // Get unique months
        const allMonths = new Set([...revenueMap.keys(), ...expenseMap.keys()]);
        const sortedMonths = Array.from(allMonths).sort().reverse();

        for (const month of sortedMonths) {
            const revenue = revenueMap.get(month) || 0;
            const expenses = expenseMap.get(month) || 0;
            summary.push({
                month,
                revenue,
                expenses,
                net: revenue - expenses
            });
        }

        res.status(200).json(summary);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get financial summary" });
    }
};
