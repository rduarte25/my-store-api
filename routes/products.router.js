const express = require('express');
const ProductsService = require('../services/products.service');
const validatorHandle = require('../middlewares/validator.handle');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/product.schemas');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get(
  '/:id',
  validatorHandle(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.post('/', validatorHandle(createProductSchema, 'body'), (req, res) => {
  const body = req.body;
  const product = service.create(body);
  res.status(201).json({ message: 'created', data: product });
});

router.patch(
  '/:id',
  validatorHandle(getProductSchema, 'params'),
  validatorHandle(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json({ message: 'update', data: product, id });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandle(getProductSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const product = await service.delete(id);
    res.json({ message: 'delete', data: product, id });
  },
);

module.exports = router;
