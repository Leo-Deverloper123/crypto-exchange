const User = require('../models/User');
const Wallet = require('../models/Wallet');
const jwt = require('jsonwebtoken');

const userController = {
  // Register new user
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      
      const user = await User.create({
        username,
        email,
        password
      });

      // Create default wallets for new user
      const currencies = ['BTC', 'ETH', 'XRP', 'DOGE', 'THB', 'USD'];
      await Promise.all(currencies.map(currency => 
        Wallet.create({
          userId: user.id,
          currency,
          balance: 0
        })
      ));

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      
      res.status(201).json({
        message: 'User registered successfully',
        token
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get user wallets
  async getWallets(req, res) {
    try {
      const wallets = await Wallet.findAll({
        where: { userId: req.user.id }
      });

      res.json(wallets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = userController;
