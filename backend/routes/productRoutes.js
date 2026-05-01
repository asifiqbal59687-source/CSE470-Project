const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// The URL React is looking for: /api/products/alerts/low-stock
router.get('/alerts/low-stock', productController.getLowStockAlerts);

router.get('/', productController.getAllProducts);
router.get('/categories', productController.getCategories);
router.put('/:id', productController.updateProductInfo);

module.exports = router;