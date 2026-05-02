# System Architecture Documentation

## Tech Stack Overview
The SME Performance Monitoring System uses a full-stack JavaScript architecture:
- **Frontend Framework:** React (bootstrapped with Create React App)
- **Frontend Libraries:** Chart.js, react-chartjs-2 (for data visualization), React Testing Library (for UI testing)
- **Backend Framework:** Node.js with Express.js
- **Backend Libraries:** MySQL2 (database connection), Bcrypt (password hashing), CORS, Dotenv, json2csv (for reporting)
- **Database:** MySQL
- **Architecture Pattern:** MVC (Model-View-Controller) implemented on the backend.

## Folder Structure
```text
SME Performance Monitoring System
├── backend/
│   ├── config/         # Database configuration (db.js)
│   ├── controllers/    # Business logic handling requests and formatting responses
│   ├── models/         # Data access layer (MySQL queries)
│   ├── routes/         # API endpoint definitions mapped to controllers
│   ├── index.js        # Main Express server entry point
│   ├── migrate.js      # Database schema initialization and migrations
│   └── package.json    # Backend dependencies and scripts
└── frontend/
    ├── public/         # Static assets
    ├── src/
    │   ├── components/ # React UI components (Login, Dashboards, Forms)
    │   ├── App.js      # Main application layout, routing, and state management
    │   ├── index.js    # React entry point
    │   └── index.css   # Global styles
    └── package.json    # Frontend dependencies and scripts
```

## Database Schema
The MySQL database consists of the following core tables and relationships:

1. **`users`**
   - `id` (PK), `username` (UNIQUE), `password`
2. **`suppliers`**
   - `id` (PK), `supplier_name`, `phone`
3. **`customers`**
   - `id` (PK), `name`
4. **`product_categories`**
   - `id` (PK), `name`
5. **`products`**
   - `id` (PK), `product_name`, `stock_quantity`, `min_threshold`, `supplier_id` (FK), `category_id` (FK), `cost_price`, `selling_price`
6. **`sales`**
   - `id` (PK), `amount`, `cost`, `sale_date`, `customer_id` (FK), `product_id` (FK), `quantity`, `price`
7. **`expense_categories`**
   - `id` (PK), `name`
8. **`expenses`**
   - `id` (PK), `category_id` (FK), `amount`, `expense_date`, `description`
9. **`audit_logs`**
   - `id` (PK), `action_type`, `table_name`, `description`, `action_date`

## API Routing
The backend exposes the following RESTful API endpoints:

- **Auth Gate (`/api/auth`)**: Authentication and user sessions.
- **Customer Intelligence (`/api/customers`)**: Customer history, purchase analytics, low margin items, max-id fetching.
- **Supplier Management (`/api/suppliers`)**: Manage supplier data.
- **Product Management (`/api/products`)**: Stock alerts, product listings, updates.
- **Audit & Security (`/api/audit`)**: Fetching system audit logs.
- **Sales Transactions (`/api/sales`)**: Record sales, fetch revenue data.
- **Expenses (`/api/expenses`)**: Track operational expenses.
- **Finance (`/api/finance`)**: Financial summaries (profit, total revenue, total expenses).
- **Analytics (`/api/analytics`)**: Advanced analytics endpoints for dashboard charts.
- **Reports (`/api/reports`)**: Exporting system data to CSV/reports.

## Component Tree
The main React UI component tree and feature connectivity:

- **`App`** (Main Container & Auth Gatekeeper)
  - `Login` (User Authentication)
  - `StockAlerts` (Proactive low stock warnings)
  - `LowMarginAlerts` (Proactive low margin item warnings)
  - `AnalyticsDashboard` (Performance Analytics charts)
  - `SalesEntry` (Phase 1: Record new sales)
  - `ProductManagement` (Phase 1: Manage inventory)
  - `ExpenseTracker` (Phase 2: Add and list expenses)
  - `FinancialSummary` (Phase 2: High-level financial KPIs)
  - `ReportingCenter` (Phase 3: Data visualization and CSV exports)
  - `SupplierList` (Supplier network management)
  - `CustomerHistory` (Customer intelligence and history viewer)
  - `AuditLogs` (Security and audit tracker)
