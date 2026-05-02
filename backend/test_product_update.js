const request = require('supertest');
const app = require('./index');

async function testUpdateProduct() {
  const res = await request(app).put('/api/products/1').send({
    cost_price: 10
    // Missing selling_price and category_id
  });

  console.log("Status:", res.status);
  console.log("Body:", res.body);
  if (res.status === 400 && res.body.error === "cost_price, selling_price, and category_id are required fields") {
    console.log("✅ Test Passed: Backend returns 400 Bad Request instead of crashing.");
  } else {
    console.error("❌ Test Failed!");
  }
  process.exit(0);
}

testUpdateProduct();
