const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Transaction extends Model {}

Transaction.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  fromWalletId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Wallets',
      key: 'id'
    }
  },
  toWalletId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Wallets',
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.DECIMAL(24, 8),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  currency: {
    type: DataTypes.ENUM('BTC', 'ETH', 'XRP', 'DOGE', 'THB', 'USD'),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('internal', 'external', 'exchange'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending'
  },
  externalAddress: {
    type: DataTypes.STRING,
    allowNull: true // Only for external transactions
  }
}, {
  sequelize,
  modelName: 'Transaction'
});

module.exports = Transaction;
