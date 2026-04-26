const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// URL will be: /api/products/alerts
router.get('/alerts', productController.getAlerts);

module.exports = router;