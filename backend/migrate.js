const db = require('./config/db');

async function setupDatabase() {
    try {
        console.log("Setting up baseline and new schema...");

        // BASELINE SCHEMA (from teammates' work)
        await db.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            )
        `);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS suppliers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                supplier_name VARCHAR(100) NOT NULL,
                phone VARCHAR(20)
            )
        `);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS customers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL
            )
        `);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS audit_logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                action_type VARCHAR(50) NOT NULL,
                table_name VARCHAR(50) NOT NULL,
                description TEXT,
                action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // NEW PHASE 1 SCHEMA
        await db.execute(`
            CREATE TABLE IF NOT EXISTS product_categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL
            )
        `);
        await db.execute(`INSERT IGNORE INTO product_categories (id, name) VALUES (1, 'Electronics'), (2, 'Office Supplies'), (3, 'Furniture')`);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                product_name VARCHAR(100) NOT NULL,
                stock_quantity INT DEFAULT 0,
                min_threshold INT DEFAULT 10,
                supplier_id INT,
                category_id INT,
                cost_price DECIMAL(10,2) DEFAULT 0.00,
                selling_price DECIMAL(10,2) DEFAULT 0.00,
                FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
                FOREIGN KEY (category_id) REFERENCES product_categories(id)
            )
        `);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS sales (
                id INT AUTO_INCREMENT PRIMARY KEY,
                amount DECIMAL(10,2) NOT NULL,
                cost DECIMAL(10,2) NOT NULL,
                sale_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                customer_id INT,
                product_id INT,
                quantity INT DEFAULT 1,
                price DECIMAL(10,2) DEFAULT 0.00,
                FOREIGN KEY (customer_id) REFERENCES customers(id),
                FOREIGN KEY (product_id) REFERENCES products(id)
            )
        `);

        // NEW PHASE 2 SCHEMA
        await db.execute(`
            CREATE TABLE IF NOT EXISTS expense_categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL
            )
        `);
        await db.execute(`INSERT IGNORE INTO expense_categories (id, name) VALUES (1, 'Rent'), (2, 'Utilities'), (3, 'Salaries'), (4, 'Marketing')`);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS expenses (
                id INT AUTO_INCREMENT PRIMARY KEY,
                category_id INT,
                amount DECIMAL(10,2) NOT NULL,
                expense_date DATE NOT NULL,
                description VARCHAR(255),
                FOREIGN KEY (category_id) REFERENCES expense_categories(id)
            )
        `);

        // Insert Default User (admin/admin)
        const bcrypt = require('bcrypt');
        const hash = await bcrypt.hash('admin', 10);
        try {
            await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', ['admin', hash]);
            console.log("Created default admin user.");
        } catch (e) {
            console.log("Admin user likely exists.");
        }

        console.log("Database setup complete!");
        process.exit(0);
    } catch (e) {
        console.error("Database setup failed:", e);
        process.exit(1);
    }
}

setupDatabase();
