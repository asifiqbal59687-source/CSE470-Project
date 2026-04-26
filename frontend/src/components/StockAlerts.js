import React, { useEffect, useState } from 'react';

const StockAlerts = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        // This matches your new Product route!
        fetch('/api/products/alerts')
            .then(res => res.json())
            .then(data => setAlerts(data))
            .catch(err => console.error("Stock Alert Error:", err));
    }, []);

    // If no products are low on stock, the component renders nothing.
    // This keeps the dashboard clean!
    if (alerts.length === 0) return null;

    return (
        <div style={{ 
            backgroundColor: '#fff3cd', 
            border: '1px solid #ffeeba', 
            padding: '20px', 
            borderRadius: '12px',
            marginBottom: '30px',
            color: '#856404',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
            <h3 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '10px' }}>⚠️</span> Low Stock Alerts
            </h3>
            <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem' }}>
                The following items are below their minimum threshold and need restocking:
            </p>
            <ul style={{ margin: 0, paddingLeft: '25px' }}>
                {alerts.map(item => (
                    <li key={item.id} style={{ marginBottom: '8px' }}>
                        <strong>{item.product_name}</strong>: 
                        Currently <strong>{item.stock_quantity}</strong> in stock 
                        (Threshold: {item.min_threshold})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StockAlerts;