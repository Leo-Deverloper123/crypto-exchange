const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const sequelize = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Server configuration
const PORT = process.env.PORT;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();
