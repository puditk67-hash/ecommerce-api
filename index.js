const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());

// 🔥 FIX CORS (สำคัญ)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

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
// ===== PRODUCTS =====
app.get("/api/products", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== ORDERS =====
app.get("/api/orders", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM orders");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ===== PRODUCTS =====
app.get("/api/products", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== ORDERS =====
app.get("/api/orders", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM orders");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = (req, res) => {
  app(req, res);
};