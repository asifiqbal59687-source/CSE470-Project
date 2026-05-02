const fs = require('fs');
const request = require('supertest');
const app = require('./index');

async function runTests() {
  const results = [];
  const endpoints = [
    { name: 'Analytics Dashboard Data', method: 'GET', url: '/api/analytics/' },
    { name: 'Audit Logs', method: 'GET', url: '/api/audit/' },
    { name: 'Auth Register', method: 'POST', url: '/api/auth/register', body: { username: 'testuser', password: 'password' } },
    { name: 'Auth Login', method: 'POST', url: '/api/auth/login', body: { username: 'testuser', password: 'password' } },
    { name: 'Customer Max ID', method: 'GET', url: '/api/customers/meta/max-id' },
    { name: 'Customer History', method: 'GET', url: '/api/customers/1/history' },
    { name: 'Customer Analytics', method: 'GET', url: '/api/customers/analytics/monthly' },
    { name: 'Customer Low Margins', method: 'GET', url: '/api/customers/alerts/low-margins' },
    { name: 'Expense Categories', method: 'GET', url: '/api/expenses/categories' },
    { name: 'Expense Monthly', method: 'GET', url: '/api/expenses/monthly' },
    { name: 'Expense Top Categories', method: 'GET', url: '/api/expenses/top-categories' },
    { name: 'Finance Summary', method: 'GET', url: '/api/finance/summary' },
    { name: 'Product Low Stock Alerts', method: 'GET', url: '/api/products/alerts/low-stock' },
    { name: 'Products All', method: 'GET', url: '/api/products/' },
    { name: 'Product Categories', method: 'GET', url: '/api/products/categories' },
    { name: 'Report Export CSV', method: 'GET', url: '/api/reports/export/csv' },
    { name: 'Sales Revenue', method: 'GET', url: '/api/sales/revenue' },
    { name: 'Suppliers All', method: 'GET', url: '/api/suppliers/' },
    { name: 'Expense Create', method: 'POST', url: '/api/expenses/', body: { category_id: 1, amount: 100, expense_date: '2026-05-01', description: 'Test' } },
    { name: 'Sales Create', method: 'POST', url: '/api/sales/', body: { customer_id: 1, product_id: 1, quantity: 1, amount: 50, cost: 30, price: 50, product_name: 'Test Product' } },
    { name: 'Product Update', method: 'PUT', url: '/api/products/1', body: { cost_price: 10, selling_price: 20, category_id: 1 } }
  ];

  for (const ep of endpoints) {
    try {
      let res;
      if (ep.method === 'GET') {
        res = await request(app).get(ep.url);
      } else if (ep.method === 'POST') {
        res = await request(app).post(ep.url).send(ep.body);
      } else if (ep.method === 'PUT') {
        res = await request(app).put(ep.url).send(ep.body);
      }

      if (res.status >= 200 && res.status < 300) {
        results.push({ feature: ep.name, passed: true, error: null });
      } else {
        // Allow 400s if it's "user already exists" for register
        if (ep.url === '/api/auth/register' && res.status === 400) {
             results.push({ feature: ep.name, passed: true, error: null });
             continue;
        }
        results.push({ feature: ep.name, passed: false, error: `Expected 2xx, got ${res.status}. Body: ${JSON.stringify(res.body)}` });
      }
    } catch (err) {
      results.push({ feature: ep.name, passed: false, error: err.message });
    }
  }

  fs.writeFileSync('results.json', JSON.stringify(results, null, 2), 'utf8');
  process.exit(0);
}

runTests();
