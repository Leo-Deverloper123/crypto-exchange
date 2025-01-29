const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Wallet extends Model {
  async getBalance() {
    return {
      balance: this.balance,
      currency: this.currency
    };
  }
}

Wallet.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  currency: {
    type: DataTypes.ENUM('BTC', 'ETH', 'XRP', 'DOGE', 'THB', 'USD'),
    allowNull: false
  },
  balance: {
    type: DataTypes.DECIMAL(24, 8),
    defaultValue: 0,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  address: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true // For crypto wallets only
  }
}, {
  sequelize,
  modelName: 'Wallet'
});

module.exports = Wallet;
