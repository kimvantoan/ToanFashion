import express from 'express';
import {
  createVoucher,
  updateVoucher,
  getAllVouchers,
  deleteVoucher,
  getVoucherById
} from '../controllers/voucher.controller.js';
import { protect, admin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/',  protect, admin, createVoucher);
router.put('/:id',  protect, admin, updateVoucher);
router.get('/',  protect, getAllVouchers);
router.get('/:id',  protect, admin, getVoucherById);
router.delete('/:id',  protect, admin, deleteVoucher);

export default router;