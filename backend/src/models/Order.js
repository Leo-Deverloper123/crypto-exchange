const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Order extends Model {}

Order.init({
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
  type: {
    type: DataTypes.ENUM('buy', 'sell'),
    allowNull: false
  },
  baseCurrency: {
    type: DataTypes.ENUM('BTC', 'ETH', 'XRP', 'DOGE'),
    allowNull: false
  },
  quoteCurrency: {
    type: DataTypes.ENUM('THB', 'USD'),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(24, 8),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  price: {
    type: DataTypes.DECIMAL(24, 8),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  status: {
    type: DataTypes.ENUM('open', 'filled', 'cancelled'),
    defaultValue: 'open'
  },
  filledAmount: {
    type: DataTypes.DECIMAL(24, 8),
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'Order'
});

module.exports = Order;
