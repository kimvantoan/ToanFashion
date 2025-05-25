import express from 'express';
import { getCheckoutData } from '../controllers/checkout.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', protect, getCheckoutData);

export default router;
