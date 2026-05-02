import React, { useState, useEffect } from 'react';

const ReportingCenter = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/analytics')
            .then(res => res.json())
            .then(d => {
                if (d && !d.error) setData(d);
                else setData(null);
            })
            .catch(err => console.error("Error fetching analytics", err));
    }, []);

    const handleDownload = () => {
        window.open('/api/reports/export/csv', '_blank');
    };

    if (!data) return <p>Loading Analytics...</p>;

    const { metrics, productMargins, trends } = data;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>📊 Advanced Analytics & Reports</h3>
                <button onClick={handleDownload} style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    📥 Export Monthly Report (CSV)
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
                <MetricCard title="Gross Profit" value={`$${parseFloat(metrics.grossProfit || 0).toFixed(2)}`} />
                <MetricCard title="Net Profit" value={`$${parseFloat(metrics.netProfit || 0).toFixed(2)}`} color={metrics.netProfit >= 0 ? 'green' : 'red'} />
                <MetricCard title="Break-Even Revenue" value={`$${parseFloat(metrics.breakEvenRevenue || 0).toFixed(2)}`} />
            </div>

            <h4 style={{ marginTop: '30px' }}>📉 Sales Trends</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>
                        <th style={{ padding: '8px' }}>Month</th>
                        <th style={{ padding: '8px' }}>Revenue</th>
                        <th style={{ padding: '8px' }}>Growth Rate</th>
                        <th style={{ padding: '8px' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {trends.map(t => (
                        <tr key={t.month} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '8px' }}>{t.month}</td>
                            <td style={{ padding: '8px' }}>${parseFloat(t.revenue || 0).toFixed(2)}</td>
                            <td style={{ padding: '8px', color: t.isDeclining ? 'red' : 'green' }}>{parseFloat(t.growthRate || 0).toFixed(2)}%</td>
                            <td style={{ padding: '8px' }}>{t.isDeclining ? '⚠️ Declining' : '✅ Growing'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h4 style={{ marginTop: '30px' }}>🛍️ Product Profit Margins</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>
                        <th style={{ padding: '8px' }}>Product</th>
                        <th style={{ padding: '8px' }}>Cost</th>
                        <th style={{ padding: '8px' }}>Price</th>
                        <th style={{ padding: '8px' }}>Margin</th>
                    </tr>
                </thead>
                <tbody>
                    {productMargins.slice(0, 5).map((p, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '8px' }}>{p.product_name}</td>
                            <td style={{ padding: '8px' }}>${parseFloat(p.cost_price).toFixed(2)}</td>
                            <td style={{ padding: '8px' }}>${parseFloat(p.selling_price).toFixed(2)}</td>
                            <td style={{ padding: '8px' }}>{parseFloat(p.margin_percentage).toFixed(2)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const MetricCard = ({ title, value, color = '#1a1a2e' }) => (
    <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px', borderLeft: `5px solid ${color}`, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '0.9rem', color: '#6c757d', marginBottom: '5px' }}>{title}</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color }}>{value}</div>
    </div>
);

export default ReportingCenter;
