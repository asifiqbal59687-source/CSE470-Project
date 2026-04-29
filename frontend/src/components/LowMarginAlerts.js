import React, { useEffect, useState } from 'react';

const LowMarginAlerts = () => {
    const [lowMargins, setLowMargins] = useState([]);

    useEffect(() => {
        fetch('/api/customers/alerts/low-margins')
            .then(res => res.json())
            .then(data => setLowMargins(data))
            .catch(err => console.error("Margin Alert Error:", err));
    }, []);

    if (lowMargins.length === 0) return null;

    return (
        <div style={{ 
            backgroundColor: '#fff4e5', 
            border: '1px solid #ffe2b3', 
            padding: '20px', 
            borderRadius: '15px',
            marginBottom: '25px',
            color: '#663c00',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            borderLeft: '6px solid #ff9800'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '1.4rem', marginRight: '10px' }}>📉</span>
                <h3 style={{ margin: 0 }}>Low Margin Sales Detected</h3>
            </div>
            <p style={{ fontSize: '0.9rem', marginBottom: '15px' }}>
                The following transactions are currently performing below the 15% profit margin threshold:
            </p>
            <div style={{ display: 'grid', gap: '10px' }}>
                {lowMargins.map(sale => (
                    <div key={sale.id} style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.6)', 
                        padding: '10px 15px', 
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <span>Sale <strong>#{sale.id}</strong> - {sale.customer_name}</span>
                        <span style={{ color: '#d9534f', fontWeight: 'bold' }}>
                            Margin: {parseFloat(sale.margin_percentage).toFixed(2)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LowMarginAlerts;