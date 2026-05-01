import React, { useState, useEffect } from 'react';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const prodRes = await fetch('/api/products');
        const catRes = await fetch('/api/products/categories');
        if (prodRes.ok) setProducts(await prodRes.json());
        if (catRes.ok) setCategories(await catRes.json());
    };

    const handleUpdate = async (id, cost_price, selling_price, category_id) => {
        await fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cost_price, selling_price, category_id })
        });
        fetchData();
    };

    return (
        <div>
            <h3>📦 Manage Products (Pricing & Categories)</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>
                        <th style={{ padding: '10px' }}>Product</th>
                        <th style={{ padding: '10px' }}>Category</th>
                        <th style={{ padding: '10px' }}>Cost Price</th>
                        <th style={{ padding: '10px' }}>Selling Price</th>
                        <th style={{ padding: '10px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <ProductRow key={p.id} product={p} categories={categories} onUpdate={handleUpdate} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const ProductRow = ({ product, categories, onUpdate }) => {
    const [cost, setCost] = useState(product.cost_price || 0);
    const [price, setPrice] = useState(product.selling_price || 0);
    const [cat, setCat] = useState(product.category_id || 1);

    return (
        <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '10px' }}>{product.product_name}</td>
            <td style={{ padding: '10px' }}>
                <select value={cat} onChange={e => setCat(e.target.value)} style={{ padding: '5px' }}>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </td>
            <td style={{ padding: '10px' }}>
                $<input type="number" step="0.01" value={cost} onChange={e => setCost(e.target.value)} style={{ width: '70px', padding: '5px' }} />
            </td>
            <td style={{ padding: '10px' }}>
                $<input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} style={{ width: '70px', padding: '5px' }} />
            </td>
            <td style={{ padding: '10px' }}>
                <button onClick={() => onUpdate(product.id, cost, price, cat)} style={{ padding: '5px 10px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                    Save
                </button>
            </td>
        </tr>
    );
};

export default ProductManagement;
