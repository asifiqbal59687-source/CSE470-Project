# System Bug Report & Testing Audit

## Failing Tests & Bugs

### Frontend UI - Initial Render Test
**Expected Behavior:** The default React test should verify the actual initial screen of the application (the `SME360 Login` component) or simply verify that the `App` component renders without crashing.
**Actual Behavior:** The test fails with `TestingLibraryElementError: Unable to find an element with the text: /learn react/i.` because it is still looking for the default Create React App template text, which was removed during development.
**File Origin:** `frontend/src/App.test.js` (Line 6)

### Product Management - Update Product API (`PUT /api/products/:id`)
**Expected Behavior:** If `category_id` (or other required fields) are missing from the request body during a product update, the controller should validate the input and return a graceful `400 Bad Request` with an appropriate error message.
**Actual Behavior:** The lack of input validation causes the `category_id` to pass as `undefined` into the MySQL database query, crashing the server with a `500 Internal Server Error` and logging `TypeError: Bind parameters must not contain undefined. To pass SQL NULL specify JS null`.
**File Origin:** `backend/controllers/productController.js` (Line 16) & `backend/models/productModel.js` (Line 28)

---

## Passing Features

The following 25+ features and endpoints have been dynamically tested in-memory and successfully validated business logic, edge cases (where handled gracefully like 400s), and database interactions:

- **User Authentication (Registration)** (`POST /api/auth/register`)
- **User Authentication (Login)** (`POST /api/auth/login`)
- **Analytics Dashboard Data** (`GET /api/analytics/`)
- **Audit Logs Retrieval** (`GET /api/audit/`)
- **Customer Max ID Fetcher** (`GET /api/customers/meta/max-id`)
- **Customer History Viewer** (`GET /api/customers/:id/history`)
- **Customer Monthly Analytics** (`GET /api/customers/analytics/monthly`)
- **Customer Low Margin Alerts** (`GET /api/customers/alerts/low-margins`)
- **Expense Creation** (`POST /api/expenses/`)
- **Expense Categories Fetcher** (`GET /api/expenses/categories`)
- **Expense Monthly Aggregation** (`GET /api/expenses/monthly`)
- **Expense Top Categories** (`GET /api/expenses/top-categories`)
- **Financial Summary Metrics** (`GET /api/finance/summary`)
- **Product Low Stock Alerts** (`GET /api/products/alerts/low-stock`)
- **Products Listing (All)** (`GET /api/products/`)
- **Product Categories Fetcher** (`GET /api/products/categories`)
- **Report Export (CSV)** (`GET /api/reports/export/csv`)
- **Sales Creation (Valid Request)** (`POST /api/sales/`)
- **Sales Revenue Metrics** (`GET /api/sales/revenue`)
- **Suppliers Listing** (`GET /api/suppliers/`)
