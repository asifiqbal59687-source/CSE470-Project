import React, { useState, useEffect } from 'react';

const SalesEntry = () => {
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [cost, setCost] = useState('');
    const [customerId, setCustomerId] = useState(1);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');

    // Logically determine the next Product ID based on database
    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const maxId = Math.max(...data.map(p => p.id));
                    setProductId(maxId + 1);
                } else {
                    setProductId(1);
                }
            })
            .catch(err => {
                console.error(err);
                setProductId(1); // Fallback
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!productName || !price || !cost) {
            setMessage('Please fill in all product details.');
            return;
        }

        const amount = parseFloat(price) * parseInt(quantity);
        const totalCost = parseFloat(cost) * parseInt(quantity);

        try {
            const res = await fetch('/api/sales', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    amount, 
                    cost: totalCost, 
                    customer_id: customerId, 
                    product_id: productId, 
                    product_name: productName,
                    quantity, 
                    price: parseFloat(price) 
                })
            });
            if (res.ok) {
                setMessage('Sale recorded successfully!');
                setQuantity(1);
                setProductName('');
                setProductId(prev => prev + 1); // Logically increment for the next entry
                setPrice('');
                setCost('');
                setTimeout(() => setMessage(''), 3000);
            } else {
                const data = await res.json();
                setMessage(`Error: ${data.error || 'Failed to record sale'}`);
            }
        } catch (err) {
            console.error(err);
            setMessage('Error recording sale');
        }
    };

    return (
        <div>
            <h3>🛒 Record Sale</h3>
            {message && <div style={{ color: message.startsWith('Error') ? 'red' : 'green', marginBottom: '10px' }}>{message}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Product ID (Auto)</label>
                    <input type="number" value={productId} disabled style={{ padding: '8px', width: '90px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#e9ecef', cursor: 'not-allowed' }} />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Product Name</label>
                    <input type="text" value={productName} onChange={e => setProductName(e.target.value)} style={{ padding: '8px', width: '130px', borderRadius: '5px', border: '1px solid #ccc' }} required />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Unit Price ($)</label>
                    <input type="number" step="0.01" min="0" value={price} onChange={e => setPrice(e.target.value)} style={{ padding: '8px', width: '80px', borderRadius: '5px', border: '1px solid #ccc' }} required />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Unit Cost ($)</label>
                    <input type="number" step="0.01" min="0" value={cost} onChange={e => setCost(e.target.value)} style={{ padding: '8px', width: '80px', borderRadius: '5px', border: '1px solid #ccc' }} required />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Customer ID</label>
                    <input type="number" min="1" value={customerId} onChange={e => setCustomerId(e.target.value)} style={{ padding: '8px', width: '80px', borderRadius: '5px', border: '1px solid #ccc' }} required />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Quantity</label>
                    <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} style={{ padding: '8px', width: '80px', borderRadius: '5px', border: '1px solid #ccc' }} required />
                </div>
                <button type="submit" style={{ padding: '9px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Record Transaction
                </button>
            </form>
        </div>
    );
};

export default SalesEntry;
