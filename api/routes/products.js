const express = require('express');
const router = express.Router();
const db = require('../../db');

// SEED
async function seedProducts() {
  const [rows] = await db.query('SELECT COUNT(*) as count FROM products');
  if (rows[0].count === 0) {
    await db.query(`
      INSERT INTO products (name, price, stock) VALUES
      ('Laptop', 1000, 10),
      ('Phone', 500, 20),
      ('Headphones', 100, 50)
    `);
  }
}

// GET ALL
router.get('/', async (req, res) => {
  try {
    await seedProducts();
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;