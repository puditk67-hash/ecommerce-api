const express = require('express');
const router = express.Router();
const db = require('../../db');

// 🔥 SEED DATA (เพิ่มอัตโนมัติถ้ายังไม่มี)
async function seedCustomers() {
  const [rows] = await db.query('SELECT COUNT(*) as count FROM customers');
  if (rows[0].count === 0) {
    await db.query(`
      INSERT INTO customers (name, email) VALUES
      ('John Doe', 'john@example.com'),
      ('Jane Smith', 'jane@example.com'),
      ('Alice', 'alice@test.com')
    `);
    console.log("Seeded customers");
  }
}

// GET ALL
router.get('/', async (req, res) => {
  try {
    await seedCustomers(); // 🔥 เรียกตรงนี้
    const [rows] = await db.query('SELECT * FROM customers');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET BY ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM customers WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const [result] = await db.query(
      'INSERT INTO customers (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM customers WHERE id = ?',
      [req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;