import express from 'express';
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItemQuantity
} from '../controllers/cart.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.put('/:itemId', protect, updateCartItemQuantity);
router.delete('/:itemId', protect, removeFromCart);
router.delete('/clear', protect, clearCart);

export default router;
