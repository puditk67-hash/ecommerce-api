const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ❗ ไม่ต้องใช้ pool ตรงนี้ก็ได้ (ลบได้)
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

// ===== ROUTES =====
const customersRoute = require('./routes/customers');
const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');

app.use('/api/customers', customersRoute);
app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);

// ===== TEST =====
app.get('/', (req, res) => {
  res.json({ message: 'E-commerce API running' });
});

// 🔥 แก้ตรงนี้
module.exports = app;