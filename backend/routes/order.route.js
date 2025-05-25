import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateDeliveryStatus,
  updatePaymentStatus,
  deleteOrder,
  createOrderFromCart
} from '../controllers/order.controller.js';
import { protect, admin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// User
router.post('/', protect, createOrder);
router.get('/my', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.post('/from-cart', protect, createOrderFromCart);

// Admin
router.get('/', protect, admin, getAllOrders);
router.put('/:id/delivery', protect, admin, updateDeliveryStatus);
router.put('/:id/payment', protect, admin, updatePaymentStatus);
router.delete('/:id', protect, admin, deleteOrder);

export default router;
