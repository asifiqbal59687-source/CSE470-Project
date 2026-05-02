import React, { useState, useEffect } from 'react';

const FinancialSummary = () => {
    const [summary, setSummary] = useState([]);
    const [topCategories, setTopCategories] = useState([]);

    useEffect(() => {
        fetch('/api/finance/summary')
            .then(res => res.json())
            .then(data => setSummary(Array.isArray(data) ? data : []));

        fetch('/api/expenses/top-categories')
            .then(res => res.json())
            .then(data => setTopCategories(Array.isArray(data) ? data : []));
    }, []);

    return (
        <div>
            <h3>📈 Monthly Financial Overview</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px', marginBottom: '30px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>
                        <th style={{ padding: '10px' }}>Month</th>
                        <th style={{ padding: '10px' }}>Revenue</th>
                        <th style={{ padding: '10px' }}>Expenses</th>
                        <th style={{ padding: '10px' }}>Net Profit</th>
                    </tr>
                </thead>
                <tbody>
                    {summary.map(s => (
                        <tr key={s.month} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '10px' }}>{s.month}</td>
                            <td style={{ padding: '10px', color: 'green' }}>${parseFloat(s.revenue || 0).toFixed(2)}</td>
                            <td style={{ padding: '10px', color: 'red' }}>${parseFloat(s.expenses || 0).toFixed(2)}</td>
                            <td style={{ padding: '10px', fontWeight: 'bold', color: s.net >= 0 ? 'green' : 'red' }}>
                                ${parseFloat(s.net || 0).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h4>🔥 Highest Expense Categories</h4>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {topCategories.map((cat, idx) => (
                    <li key={idx} style={{ padding: '8px 0', borderBottom: '1px dashed #ccc', display: 'flex', justifyContent: 'space-between' }}>
                        <span>{cat.name}</span>
                        <span style={{ fontWeight: 'bold', color: '#dc3545' }}>${parseFloat(cat.total).toFixed(2)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FinancialSummary;
