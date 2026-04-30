const db = require('../config/db');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        
        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const user = rows[0];

        // Simple string comparison for the demo
        if (password !== user.password) {
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