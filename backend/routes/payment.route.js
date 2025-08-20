import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import {
  checkPaymentVNPAY,
  createPayment,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-payment", protect, createPayment);
router.get("/check-payment-vnpay", checkPaymentVNPAY);
export default router;
