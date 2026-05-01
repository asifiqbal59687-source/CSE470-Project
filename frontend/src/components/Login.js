import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            if (response.ok) {
                if (isRegister) {
                    setMessage("Registration successful! Please login.");
                    setIsRegister(false);
                } else {
                    onLogin(data.user);
                }
            } else {
                setError(data.message || data.error);
            }
        } catch (err) {
            setError("Could not connect to server");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1a1a2e' }}>
            <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '40px', borderRadius: '15px', width: '350px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
                <h2 style={{ textAlign: 'center', color: '#1a1a2e', marginBottom: '30px' }}>
                    {isRegister ? 'Register SME360' : 'SME360 Login'}
                </h2>
                {error && <p style={{ color: 'red', textAlign: 'center', fontSize: '0.9rem' }}>{error}</p>}
                {message && <p style={{ color: 'green', textAlign: 'center', fontSize: '0.9rem' }}>{message}</p>}
                <div style={{ marginBottom: '20px' }}>
                    <label>Username</label>
                    <input type="text" style={{ width: '100%', padding: '10px', marginTop: '5px' }} value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div style={{ marginBottom: '30px' }}>
                    <label>Password</label>
                    <input type="password" style={{ width: '100%', padding: '10px', marginTop: '5px' }} value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '15px' }}>
                    {isRegister ? 'Register' : 'Access Dashboard'}
                </button>
                <div style={{ textAlign: 'center', fontSize: '0.9rem' }}>
                    {isRegister ? "Already have an account? " : "Need an account? "}
                    <span 
                        style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={() => { setIsRegister(!isRegister); setError(''); setMessage(''); }}
                    >
                        {isRegister ? 'Login here' : 'Register here'}
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Login;