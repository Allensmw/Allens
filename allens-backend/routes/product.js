const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your database connection

// Get all products
router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add a new product
router.post('/', (req, res) => {
  const { name, price, description, imageUrl } = req.body;
  const sql = 'INSERT INTO products (name, price, description, imageUrl) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, price, description, imageUrl], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, name, price, description, imageUrl });
  });
});

// Update a product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, description, imageUrl } = req.body;
  const sql = 'UPDATE products SET name = ?, price = ?, description = ?, imageUrl = ? WHERE id = ?';
  db.query(sql, [name, price, description, imageUrl, id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(204);
  });
});

// Delete a product
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM products WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(204);
  });
});

module.exports = router;
