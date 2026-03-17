const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express(); // ✅ ต้องมาก่อน

// Middleware
app.use(cors()); // ✅ ใช้หลังจากมี app แล้ว
app.use(express.json());

// Routes
const customersRoute = require('./routes/customers');
const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');

app.use('/api/customers', customersRoute);
app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'E-commerce API running' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Run server (local only)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3333;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;