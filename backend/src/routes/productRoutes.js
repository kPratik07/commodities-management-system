import express from 'express';
import { body, validationResult } from 'express-validator';

import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleCheck.js';

const router = express.Router();

// GET /products - both Manager and Store Keeper
router.get('/', protect, authorize('MANAGER', 'STORE_KEEPER'), async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
});

// Validation rules shared by create/update
const productValidators = [
  body('name').notEmpty().withMessage('Name is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be >= 0'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be >= 0'),
  body('unit').notEmpty().withMessage('Unit is required'),
];

// POST /products - add product (both roles allowed in this assignment)
router.post(
  '/',
  protect,
  authorize('MANAGER', 'STORE_KEEPER'),
  productValidators,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const product = await Product.create({
        ...req.body,
        createdBy: req.user._id,
        updatedBy: req.user._id,
      });
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to create product' });
    }
  }
);

// PUT /products/:id - edit product
router.put(
  '/:id',
  protect,
  authorize('MANAGER', 'STORE_KEEPER'),
  productValidators,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updatedBy: req.user._id },
        { new: true, runValidators: true }
      );

      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      res.json({ success: true, data: product });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to update product' });
    }
  }
);

export default router;
