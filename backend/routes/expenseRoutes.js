const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/', expenseController.recordExpense);
router.get('/categories', expenseController.getCategories);
router.get('/monthly', expenseController.getMonthlyExpenses);
router.get('/top-categories', expenseController.getTopCategories);

module.exports = router;
