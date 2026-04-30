const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// The URL React is looking for: /api/products/alerts/low-stock
router.get('/alerts/low-stock', productController.getLowStockAlerts);

module.exports = router;