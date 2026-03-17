const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: "*" // 🔥 สำคัญมาก
}));

app.use(express.json());

const customersRoute = require('./routes/customers');
const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');

app.use('/api/customers', customersRoute);
app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);

app.get('/', (req, res) => {
  res.json({ message: 'E-commerce API running' });
});

module.exports = app;