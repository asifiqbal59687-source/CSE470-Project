const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/export/csv', reportController.downloadMonthlyReport);

module.exports = router;
