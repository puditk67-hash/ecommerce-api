const express = require('express');
const cors = require('cors');
require('dotenv').config();

const customersRoute = require('./routes/customers');
const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/customers', customersRoute);
app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);

app.get('/', (req, res) => {
  res.json({ message: 'E-commerce API running' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3333;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;