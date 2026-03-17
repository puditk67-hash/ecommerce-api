const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }
});

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET' && req.url === '/api/customers') {
      const [rows] = await pool.query('SELECT * FROM customers');
      return res.status(200).json(rows);
    }

    res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};