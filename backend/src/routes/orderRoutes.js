const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.use(auth); // All order routes require authentication

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);

module.exports = router;
