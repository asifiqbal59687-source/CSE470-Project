import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            if (response.ok) {
                onLogin(data.user);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Could not connect to server");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1a1a2e' }}>
            <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '40px', borderRadius: '15px', width: '350px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
                <h2 style={{ textAlign: 'center', color: '#1a1a2e', marginBottom: '30px' }}>SME360 Login</h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <div style={{ marginBottom: '20px' }}>
                    <label>Username</label>
                    <input type="text" style={{ width: '100%', padding: '10px', marginTop: '5px' }} value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div style={{ marginBottom: '30px' }}>
                    <label>Password</label>
                    <input type="password" style={{ width: '100%', padding: '10px', marginTop: '5px' }} value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Access Dashboard
                </button>
            </form>
        </div>
    );
};

export default Login;