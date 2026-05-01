import React, { useEffect, useState } from 'react';

const AuditLogs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch('/api/audit')
            .then(res => res.json())
            .then(data => setLogs(Array.isArray(data) ? data : []));
    }, []);

    return (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h2 style={{ color: '#1a1a2e', marginBottom: '15px' }}>System Audit Logs</h2>
            <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '8px' }}>
                {logs.map(log => (
                    <div key={log.id} style={{ padding: '12px', borderBottom: '1px solid #f0f0f0', fontSize: '0.9rem' }}>
                        <span style={{ 
                            fontWeight: 'bold', 
                            color: log.action_type === 'INSERT' ? '#28a745' : '#007bff',
                            marginRight: '10px'
                        }}>
                            [{log.action_type}]
                        </span>
                        <span style={{ color: '#555' }}>{log.description}</span>
                        <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '4px' }}>
                            {new Date(log.action_date).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuditLogs;