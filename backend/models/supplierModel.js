const db = require('../config/db');

const Supplier = {
    getAll: async () => {
        const [rows] = await db.execute('SELECT * FROM suppliers');
        return rows;
    }
};

module.exports = Supplier;