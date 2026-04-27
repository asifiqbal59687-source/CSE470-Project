import React, { useEffect, useState } from 'react';

const StockAlerts = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        // Fetching from the new Product route which now includes JOINed Supplier data
        fetch('/api/products/alerts')
            .then(res => res.json())
            .then(data => setAlerts(data))
            .catch(err => console.error("Stock Alert Error:", err));
    }, []);

    // Component stays hidden if all inventory levels are healthy
    if (alerts.length === 0) return null;

    return (
        <div style={{ 
            backgroundColor: '#fff3cd', 
            border: '1px solid #ffeeba', 
            padding: '25px', 
            borderRadius: '15px',
            marginBottom: '35px',
            color: '#856404',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            borderLeft: '6px solid #ffc107'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ fontSize: '1.5rem', marginRight: '12px' }}>⚠️</span>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Critical Inventory Alerts</h3>
            </div>

            <p style={{ margin: '0 0 15px 0', fontSize: '0.95rem', fontWeight: '500' }}>
                The following items require immediate restocking to avoid service interruption:
            </p>

            <div style={{ display: 'grid', gap: '12px' }}>
                {alerts.map((item, index) => (
                    <div key={index} style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
                        padding: '12px 18px', 
                        borderRadius: '8px',
                        border: '1px solid rgba(133, 100, 4, 0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <div>
                            <strong style={{ fontSize: '1.05rem' }}>{item.product_name}</strong>
                            <div style={{ fontSize: '0.85rem', color: '#666' }}>
                                Stock: <span style={{ color: '#d9534f', fontWeight: 'bold' }}>{item.stock_quantity}</span> 
                                &nbsp;| Threshold: {item.min_threshold}
                            </div>
                        </div>

                        <div style={{ textAlign: 'right', minWidth: '200px' }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#1a1a2e' }}>
                                Supplier: {item.supplier_name}
                            </div>
                            <a 
                                href={`tel:${item.phone}`} 
                                style={{ 
                                    fontSize: '0.9rem', 
                                    color: '#007bff', 
                                    textDecoration: 'none',
                                    fontWeight: 'bold'
                                }}
                            >
                                📞 {item.phone}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StockAlerts;