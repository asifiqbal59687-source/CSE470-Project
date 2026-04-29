const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');


router.get('/meta/max-id', customerController.getMaxCustomerValue);
router.get('/:id/history', customerController.getHistory);
router.get('/analytics/monthly', customerController.getAnalytics);
router.get('/alerts/low-margins', customerController.getLowMarginAlerts);

module.exports = router;