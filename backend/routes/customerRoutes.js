const express = require('express');
const router = express.Router();
// We will create this controller next, but for now, let's just make the route
const customerController = {
    getCustomerHistory: (req, res) => {
        res.json({ message: "Customer history logic goes here!" });
    }
};

router.get('/:id/history', customerController.getCustomerHistory);

module.exports = router;