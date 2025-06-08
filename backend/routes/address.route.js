import express from 'express';
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from '../controllers/address.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect);

// GET tất cả địa chỉ / POST địa chỉ mới
router.route('/')
  .get(getAddresses)
  .post(addAddress);

// PUT / DELETE theo addressId
router.route('/:addressId')
  .put(updateAddress)
  .delete(deleteAddress);

export default router;
