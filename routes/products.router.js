const express = require('express');
const ProductsService = require('../services/products.service');

const router = express.Router();
const service = new ProductsService();

router.get('/', (req, res) => {
  const products = service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  res.status(200).json(product);
});

router.post('/', (req, res) => {
  const body = req.body;
  const product = service.create(body);
  res.status(201).json({ message: 'created', data: product });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body);
  res.json({ message: 'update', data: product, id });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.delete(id);
  res.json({ message: 'delete', data: product, id });
});

module.exports = router;
