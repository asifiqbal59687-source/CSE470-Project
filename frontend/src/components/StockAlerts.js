import React, { useState, useEffect } from 'react';

const StockAlerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch low stock items from the backend
        fetch('/api/products/alerts/low-stock')
            .then(res => {
                if (!res.ok) throw new Error('Network error fetching alerts');
                return res.json();
            })
            .then(data => {
                setAlerts(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Critical Alert Fetch Error:", err);
                setError("Unable to sync inventory data.");
                setLoading(false);
            });
    }, []);

    // 1. Loading State Placeholder
    if (loading) {
        return (
            <div style={{ ...containerStyle, backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
                <div style={{ color: '#6c757d', fontStyle: 'italic' }}>🔄 Synchronizing inventory data...</div>
            </div>
        );
    }

    // 2. Error State Placeholder
    if (error) {
        return (
            <div style={{ ...containerStyle, backgroundColor: '#f8d7da', border: '1px solid #f5c6cb' }}>
                <div style={{ color: '#721c24' }}>❌ {error}</div>
            </div>
        );
    }

    // 3. Main Dashboard Rendering
    const hasAlerts = alerts.length > 0;

    return (
        <div style={{ 
            ...containerStyle,
            backgroundColor: hasAlerts ? '#fff9db' : '#f8f9fa', 
            border: hasAlerts ? '2px solid #fab005' : '1px solid #dee2e6', 
            boxShadow: hasAlerts ? '0 4px 15px rgba(250, 176, 5, 0.1)' : 'none'
        }}>
            
            {/* Dynamic Header */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>{hasAlerts ? '⚠️' : '✅'}</span>
                <h3 style={{ color: hasAlerts ? '#e67e22' : '#28a745', margin: 0, fontSize: '1.2rem', letterSpacing: '0.5px' }}>
                    {hasAlerts ? 'CRITICAL INVENTORY ALERTS' : 'INVENTORY STATUS: STABLE'}
                </h3>
            </div>

            {/* Stable State (No Alerts) */}
            {!hasAlerts ? (
                <p style={{ color: '#6c757d', fontStyle: 'italic', margin: 0, paddingBottom: '10px' }}>
                    All stock levels are currently above their minimum safety thresholds.
                </p>
            ) : (
                /* Alert State (Mapping Data) */
                alerts.map(item => {
                    // --- CRITICAL DATA EXTRACTION ---
                    // Using the exact column names confirmed from your phpMyAdmin DESCRIBE query
                    const productName = item.product_name || 'Unknown Product';
                    const threshold = item.min_threshold || 0;
                    const stock = item.stock_quantity || 0;

                    // --- FEATURE 9 LOGIC: ADAPTIVE RESTOCK ---
                    // Calculation: Base 30 units + the current deficit
                    const deficit = threshold - stock;
                    const recommendedRestock = 30 + (deficit > 0 ? deficit : 0);

                    return (
                        <div key={item.id} style={itemStyle}>
                            
                            {/* LEFT COLUMN: Product & Restock Logic */}
                            <div style={{ flex: 1 }}>
                                <strong style={{ fontSize: '1.1rem', color: '#1a1a2e' }}>{productName}</strong>
                                <div style={{ fontSize: '0.9rem', color: '#495057', marginTop: '4px' }}>
                                    Current Stock: <span style={{ color: '#d9534f', fontWeight: 'bold' }}>{stock} units</span> 
                                    <span style={{ margin: '0 8px', color: '#adb5bd' }}>|</span> 
                                    Min Threshold: <strong>{threshold}</strong>
                                </div>

                                {/* Intelligent Recommendation Box */}
                                <div style={recommendationBox}>
                                    <span style={{ fontSize: '1rem' }}>💡</span>
                                    <span style={{ fontSize: '0.85rem' }}>
                                        System suggests restock of: <strong style={{ fontSize: '1rem', color: '#e67e22' }}>{recommendedRestock} units</strong>
                                    </span>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Supplier Details */}
                            <div style={{ textAlign: 'right', minWidth: '200px' }}>
                                <div style={{ fontSize: '0.8rem', color: '#6c757d', marginBottom: '2px' }}>PRIMARY SUPPLIER</div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#1a1a2e' }}>{item.supplier_name || 'Unassigned'}</div>
                                {item.supplier_contact && (
                                    <a href={`tel:${item.supplier_contact}`} style={{ 
                                        fontSize: '0.9rem', 
                                        color: '#007bff', 
                                        textDecoration: 'none',
                                        fontWeight: '500',
                                        display: 'block',
                                        marginTop: '4px'
                                    }}>
                                        📞 {item.supplier_contact}
                                    </a>
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

// --- STYLES ---
const containerStyle = { 
    padding: '25px', 
    borderRadius: '15px', 
    marginBottom: '30px', 
    minHeight: '120px',
    transition: 'all 0.3s ease'
};

const itemStyle = { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: '15px 0', 
    borderBottom: '1px solid #ffe066' 
};

const recommendationBox = { 
    marginTop: '12px', 
    padding: '8px 12px', 
    backgroundColor: 'white', 
    borderRadius: '8px', 
    border: '1px dashed #fab005', 
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    color: '#856404'
};

export default StockAlerts;