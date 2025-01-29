const sequelize = require('../../config/database');
const User = require('../../models/User');
const Wallet = require('../../models/Wallet');
const Order = require('../../models/Order');
const Transaction = require('../../models/Transaction');

async function seed() {
  try {
    // Sync database
    await sequelize.sync({ force: true });

    // Create test user
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    // Create wallets for test user
    const currencies = ['BTC', 'ETH', 'XRP', 'DOGE', 'THB', 'USD'];
    const wallets = await Promise.all(currencies.map(currency => 
      Wallet.create({
        userId: user.id,
        currency,
        balance: currency === 'THB' ? 1000000 : (currency === 'BTC' ? 1 : 10)
      })
    ));

    // Create some test orders
    await Order.create({
      userId: user.id,
      type: 'buy',
      baseCurrency: 'BTC',
      quoteCurrency: 'THB',
      amount: 0.1,
      price: 1000000
    });

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
