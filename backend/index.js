require('dotenv').config(); // Loads .env for local or cloud DB
const express = require('express');
const cors = require('cors');

// --- 1. IMPORT ALL ROUTE FILES ---
// These files handle the 6 functional requirements (FRs)
const authRoutes = require('./routes/authRoutes');      // Login/Logout
const customerRoutes = require('./routes/customerRoutes'); // History, Analytics, Low Margins, Max-ID
const supplierRoutes = require('./routes/supplierRoutes'); // Supplier Management
const productRoutes = require('./routes/productRoutes');   // Stock Alerts
const auditRoutes = require('./routes/auditRoutes');     // Audit Logs
const salesRoutes = require('./routes/salesRoutes');     // Sales & Revenue
const expenseRoutes = require('./routes/expenseRoutes'); // Expenses
const financeRoutes = require('./routes/financeRoutes'); // Finance Summary
const analyticsRoutes = require('./routes/analyticsRoutes'); // Advanced Analytics
const reportRoutes = require('./routes/reportRoutes');   // Exports

const app = express();

// --- 2. MIDDLEWARE ---
// Fixes the "Could not connect to server" error from image_d6513c.png
app.use(cors()); 
app.use(express.json()); // Essential for reading login credentials

// --- 3. REGISTER API ENDPOINTS ---

// Auth Gate (Used by the Login component)
app.use('/api/auth', authRoutes);

// Customer Intelligence & Analytics (FR-4, FR-14, Low Margin, Max-ID)
app.use('/api/customers', customerRoutes);

// Supplier Management (FR-8)
app.use('/api/suppliers', supplierRoutes);

// Stock Alerts (FR-15)
app.use('/api/products', productRoutes);

// Audit & Security (FR-24)
app.use('/api/audit', auditRoutes);

// Sales Transactions & Revenue
app.use('/api/sales', salesRoutes);

// Expenses & Finance
app.use('/api/expenses', expenseRoutes);
app.use('/api/finance', financeRoutes);

// Analytics & Reporting
app.use('/api/analytics', analyticsRoutes);
app.use('/api/reports', reportRoutes);

// --- 4. HEALTH CHECK & ERROR HANDLING ---
app.get('/', (req, res) => {
    res.send('SME360 API is active and connected.');
});

// Global error catcher for database or route failures
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error - Check Backend Logs' });
});

// --- 5. START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`-----------------------------------------`);
    console.log(`🚀 SME360 SERVER RUNNING ON PORT: ${PORT}`);
    console.log(`✅ ALL 6 FEATURES CONNECTED`);
    console.log(`-----------------------------------------`);
});