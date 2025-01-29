const Order = require('../models/Order');
const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const sequelize = require('../config/database');

const orderController = {
  // Create new order
  async createOrder(req, res) {
    const t = await sequelize.transaction();
    
    try {
      const { type, baseCurrency, quoteCurrency, amount, price } = req.body;
      const userId = req.user.id;

      // Check wallet balance
      const currency = type === 'buy' ? quoteCurrency : baseCurrency;
      const requiredAmount = type === 'buy' ? amount * price : amount;

      const wallet = await Wallet.findOne({
        where: { userId, currency }
      });

      if (wallet.balance < requiredAmount) {
        throw new Error('Insufficient balance');
      }

      // Create order
      const order = await Order.create({
        userId,
        type,
        baseCurrency,
        quoteCurrency,
        amount,
        price
      }, { transaction: t });

      // Update wallet balance
      await wallet.update({
        balance: wallet.balance - requiredAmount
      }, { transaction: t });

      await t.commit();

      res.status(201).json({
        message: 'Order created successfully',
        order
      });
    } catch (error) {
      await t.rollback();
      res.status(400).json({ error: error.message });
    }
  },

  // Get user's orders
  async getOrders(req, res) {
    try {
      const orders = await Order.findAll({
        where: { userId: req.user.id }
      });

      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = orderController;
