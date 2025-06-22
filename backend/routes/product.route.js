import express from 'express';
import multer from 'multer';
import { storage } from '../middlewares/upload.middleware.js'; 
import {
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
  getProducts,
  getProductBySlug,
  getProductById,
  getProductsByCategory,
  getNewProducts,
} from '../controllers/product.controller.js';

import { protect, admin } from '../middlewares/auth.middleware.js';

const router = express.Router();

const upload = multer({ storage });

router.get('/', getProducts);

router.get('/category/:categorySlug', getProductsByCategory);

// Lấy sản phẩm mới nhất
router.get('/new', getNewProducts); 

router.get('/slug/:slug', getProductBySlug); 

// Lấy product theo ID
router.get('/:id', getProductById);
// Tạo product có upload nhiều ảnh
router.post('/', protect, admin, upload.array('images', 10), createProduct);

// Cập nhật product, có thể upload thêm ảnh
router.put('/:id', protect, admin, upload.array('images', 10), updateProduct);

// Xóa product
router.delete('/:id', protect, admin, deleteProduct);

// Xóa 1 ảnh riêng trong product
router.delete('/:id/images/:imageId', protect, admin, deleteProductImage);

export default router;
