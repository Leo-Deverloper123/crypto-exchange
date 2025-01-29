const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', userController.register);

// Protected routes
router.get('/wallets', auth, userController.getWallets);

module.exports = router;
