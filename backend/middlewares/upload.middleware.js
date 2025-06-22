import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpg', 'jpeg', 'png','webp'],
    transformation: [{ width: 800, crop: 'scale' }],
  },
});

const upload = multer({ storage });

export default upload;
