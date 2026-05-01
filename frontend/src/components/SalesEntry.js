import React, { useState, useEffect } from 'react';

const SalesEntry = () => {
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState('');
    const [customerId, setCustomerId] = useState(1);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProducts(data);
                    if(data.length > 0) setProductId(data[0].id);
                } else {
                    setProducts([]);
                }
            })
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = products.find(p => p.id === parseInt(productId));
        if (!product) return;

        const amount = product.selling_price * quantity;
        const cost = product.cost_price * quantity;
        const price = product.selling_price;

        try {
            const res = await fetch('/api/sales', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, cost, customer_id: customerId, product_id: product.id, quantity, price })
            });
            if (res.ok) {
                setMessage('Sale recorded successfully!');
                setQuantity(1);
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h3>🛒 Record Sale</h3>
            {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Product</label>
                    <select value={productId} onChange={e => setProductId(e.target.value)} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}>
                        {products.map(p => (
                            <option key={p.id} value={p.id}>{p.product_name} (${p.selling_price})</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Customer ID</label>
                    <input type="number" min="1" value={customerId} onChange={e => setCustomerId(e.target.value)} style={{ padding: '8px', width: '80px', borderRadius: '5px', border: '1px solid #ccc' }} />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Quantity</label>
                    <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} style={{ padding: '8px', width: '80px', borderRadius: '5px', border: '1px solid #ccc' }} />
                </div>
                <button type="submit" style={{ padding: '9px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Record Transaction
                </button>
            </form>
        </div>
    );
};

export default SalesEntry;
