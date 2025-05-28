import express from 'express';
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} from '../controllers/cart.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.delete('/:itemId', protect, removeFromCart);
router.delete('/clear', protect, clearCart);

export default router;
