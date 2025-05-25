import express from 'express';
import multer from 'multer';
import { storage } from '../middlewares/upload.middleware.js';
import {
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/category.controller.js';
import { protect, admin } from '../middlewares/auth.middleware.js';

const upload = multer({ storage });
const router = express.Router();

router.post('/', protect, admin, upload.single('image'), createCategory);
router.put('/:id', protect, admin, upload.single('image'), updateCategory);
router.delete('/:id', protect, admin, deleteCategory);

export default router;
