const { Parser } = require('json2csv');
const Sales = require('../models/salesModel');
const Expense = require('../models/expenseModel');

exports.downloadMonthlyReport = async (req, res) => {
    try {
        const { monthly: revenueData } = await Sales.getRevenueMetrics();
        const expenseData = await Expense.getMonthlyExpenses();

        // Merge
        const revenueMap = new Map();
        revenueData.forEach(r => revenueMap.set(r.month, parseFloat(r.revenue)));
        
        const expenseMap = new Map();
        expenseData.forEach(e => expenseMap.set(e.month, parseFloat(e.total_expenses)));

        const allMonths = new Set([...revenueMap.keys(), ...expenseMap.keys()]);
        const sortedMonths = Array.from(allMonths).sort().reverse();

        const reportData = sortedMonths.map(month => {
            const revenue = revenueMap.get(month) || 0;
            const expenses = expenseMap.get(month) || 0;
            return {
                Month: month,
                Revenue: revenue.toFixed(2),
                Expenses: expenses.toFixed(2),
                Net_Profit: (revenue - expenses).toFixed(2)
            };
        });

        if (reportData.length === 0) {
            return res.status(404).json({ message: "No data available" });
        }

        const fields = ['Month', 'Revenue', 'Expenses', 'Net_Profit'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(reportData);

        res.header('Content-Type', 'text/csv');
        res.attachment('monthly_financial_report.csv');
        return res.send(csv);

    } catch (err) {
        console.error("Export error:", err);
        res.status(500).json({ error: "Failed to generate report" });
    }
};
