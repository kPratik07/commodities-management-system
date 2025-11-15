import express from 'express';

import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleCheck.js';

const router = express.Router();

// GET /dashboard/summary - Manager only
router.get('/summary', protect, authorize('MANAGER'), async (req, res) => {
  try {
    const products = await Product.find();

    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
    const totalValue = products.reduce((sum, p) => sum + (p.stock || 0) * (p.price || 0), 0);
    const lowStockCount = products.filter((p) => p.stock !== undefined && p.stock <= 10).length;

    res.json({
      success: true,
      data: {
        totalProducts,
        totalStock,
        totalValue,
        lowStockCount,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard summary' });
  }
});

export default router;
