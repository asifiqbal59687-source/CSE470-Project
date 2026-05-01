import React, { useState, useEffect } from 'react';

const ExpenseTracker = () => {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/expenses/categories')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCategories(data);
                    if (data.length > 0) setCategoryId(data[0].id);
                } else {
                    setCategories([]);
                }
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/expenses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category_id: categoryId, amount, expense_date: date, description })
            });
            if (res.ok) {
                setMessage('Expense recorded successfully!');
                setAmount('');
                setDescription('');
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h3>💸 Record Expense</h3>
            {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Category</label>
                        <select value={categoryId} onChange={e => setCategoryId(e.target.value)} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Amount ($)</label>
                        <input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} required style={{ padding: '8px', width: '100px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Date</label>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} required style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Description</label>
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)} style={{ padding: '8px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }} />
                </div>
                <button type="submit" style={{ padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Record Expense
                </button>
            </form>
        </div>
    );
};

export default ExpenseTracker;
