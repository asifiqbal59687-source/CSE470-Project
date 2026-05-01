const db = require('../config/db');

const Analytics = {
    // Feature 11, 12, 13, 15, 16

    getAdvancedMetrics: async () => {
        // Overall Gross & Net Profit
        const [[revenueData]] = await db.execute(`SELECT COALESCE(SUM(amount), 0) as total_revenue, COALESCE(SUM(cost), 0) as total_cogs FROM sales`);
        const [[expenseData]] = await db.execute(`SELECT COALESCE(SUM(amount), 0) as total_expenses FROM expenses`);
        
        const grossProfit = revenueData.total_revenue - revenueData.total_cogs;
        const netProfit = grossProfit - expenseData.total_expenses;

        // Break-even Analysis (Fixed Costs / (Selling Price - Variable Cost per unit))
        // Simplification: Fixed Costs = Total Expenses. 
        // We'll calculate a generic break-even revenue: Fixed Costs / (Gross Margin Ratio)
        let breakEvenRevenue = 0;
        if (revenueData.total_revenue > 0) {
            const grossMarginRatio = grossProfit / revenueData.total_revenue;
            breakEvenRevenue = grossMarginRatio > 0 ? expenseData.total_expenses / grossMarginRatio : 0;
        }

        return {
            totalRevenue: revenueData.total_revenue,
            grossProfit,
            totalExpenses: expenseData.total_expenses,
            netProfit,
            breakEvenRevenue
        };
    },

    getProductMargins: async () => {
        const query = `
            SELECT 
                p.product_name, 
                p.selling_price, 
                p.cost_price, 
                CASE 
                    WHEN p.selling_price > 0 THEN ((p.selling_price - p.cost_price) / p.selling_price) * 100 
                    ELSE 0 
                END as margin_percentage 
            FROM products p
            ORDER BY margin_percentage DESC
        `;
        const [rows] = await db.execute(query);
        return rows;
    },

    getSalesTrends: async () => {
        const query = `
            SELECT 
                DATE_FORMAT(sale_date, '%Y-%m') as month, 
                SUM(amount) as revenue
            FROM sales
            GROUP BY month
            ORDER BY month ASC
            LIMIT 12
        `;
        const [rows] = await db.execute(query);
        
        // Calculate growth rates
        const trends = [];
        for (let i = 1; i < rows.length; i++) {
            const prev = rows[i-1].revenue;
            const current = rows[i].revenue;
            const growth = prev > 0 ? ((current - prev) / prev) * 100 : 0;
            trends.push({
                month: rows[i].month,
                revenue: current,
                growthRate: growth,
                isDeclining: growth < 0
            });
        }
        return trends;
    }
};

module.exports = Analytics;
