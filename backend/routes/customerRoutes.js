const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// This matches the URL: /api/customers/:id/history
router.get('/:id/history', customerController.getCustomerHistory);

module.exports = router;


router.get('/analytics/monthly', customerController.getAnalytics);