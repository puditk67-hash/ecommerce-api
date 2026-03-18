const express = require('express');
const router = express.Router();
const db = require('../../db');

// 🔥 SEED DATA
async function seedOrders() {
  const [rows] = await db.query('SELECT COUNT(*) as count FROM orders');

  if (rows[0].count === 0) {
    await db.query(`
      INSERT INTO orders (customer_id, total, status) VALUES
      (1, 2000, 'placed'),
      (2, 700, 'placed')
    `);
    console.log("Seeded orders");
  }
}

// ✅ GET ALL
router.get('/', async (req, res) => {
  try {
    await seedOrders();
    const [rows] = await db.query('SELECT * FROM orders');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;