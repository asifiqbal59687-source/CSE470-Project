import React, { useEffect, useState } from 'react';

const CustomerHistory = ({ customerId }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // This calls your backend via the proxy in package.json
        fetch(`/api/customers/${customerId}/history`)
            .then(res => res.json())
            .then(data => {
                setHistory(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching history:", err);
                setLoading(false);
            });
    }, [customerId]);

    if (loading) return <p>Loading transaction history...</p>;
    if (history.length === 0) return <p>No purchase history found for this customer.</p>;

    return (
        <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ color: '#333' }}>Purchase History: {history[0].customer_name}</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#007bff', color: 'white', textAlign: 'left' }}>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Sale ID</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Amount (BDT)</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((item) => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.id}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>৳{item.amount}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                {new Date(item.sale_date).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerHistory;