const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.post('/', salesController.recordSale);
router.get('/revenue', salesController.getRevenue);

module.exports = router;
