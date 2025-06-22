import express from 'express';
import multer from 'multer';
import upload from '../middlewares/upload.middleware.js';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryBySlug
} from '../controllers/category.controller.js';
import { protect, admin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/slug/:slug', getCategoryBySlug);  
router.post('/', protect, admin, upload.single('image'), createCategory);
router.put('/:id', protect, admin, upload.single('image'), updateCategory);
router.delete('/:id', protect, admin, deleteCategory);

export default router;
