const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');

router.get('/summary', financeController.getFinancialSummary);

module.exports = router;
