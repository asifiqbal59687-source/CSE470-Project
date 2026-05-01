const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [existing] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        if (existing.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error during registration" });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        
        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const user = rows[0];

        // bcrypt comparison
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Send back a simple "success" flag and user data
        res.status(200).json({ 
            message: "Login successful", 
            user: { id: user.id, username: user.username } 
        });

    } catch (err) {
        res.status(500).json({ error: "Server error during login" });
    }
};