const db = require('../config/db');

const Audit = {
    getAll: async () => {
        const [rows] = await db.execute('SELECT * FROM audit_logs ORDER BY action_date DESC LIMIT 20');
        return rows;
    },
    // We'll use this function later to automatically record actions
    logEvent: async (type, table, desc) => {
        const query = 'INSERT INTO audit_logs (action_type, table_name, description) VALUES (?, ?, ?)';
        await db.execute(query, [type, table, desc]);
    }
};

module.exports = Audit;