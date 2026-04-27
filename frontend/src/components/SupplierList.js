import React, { useEffect, useState } from 'react';

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        fetch('/api/suppliers')
            .then(res => res.json())
            .then(data => setSuppliers(data));
    }, []);

    return (
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h2 style={{ color: '#1a1a2e' }}>Primary Suppliers</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                        <th style={{ padding: '10px' }}>Company</th>
                        <th style={{ padding: '10px' }}>Contact</th>
                        <th style={{ padding: '10px' }}>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map(s => (
                        <tr key={s.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                            <td style={{ padding: '10px' }}>{s.supplier_name}</td>
                            <td style={{ padding: '10px' }}>{s.contact_person}</td>
                            <td style={{ padding: '10px' }}>{s.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SupplierList;