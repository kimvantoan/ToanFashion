import express from "express";
import {
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateDeliveryStatus,
  updatePaymentStatus,
  deleteOrder,
  createOrderUnified,
} from "../controllers/order.controller.js";
import { protect, admin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// User
router.post("/", protect, createOrderUnified);
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

// Admin
router.get("/", protect, admin, getAllOrders);
router.put("/:id/delivery", protect, admin, updateDeliveryStatus);
router.put("/:id/payment", protect, admin, updatePaymentStatus);
router.delete("/:id", protect, admin, deleteOrder);

export default router;
