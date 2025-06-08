import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Kiểm tra đăng nhập
export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) throw new Error('Chưa đăng nhập');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) throw new Error('Người dùng không tồn tại');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Không được phép, cần đăng nhập' });
  }
};

// Kiểm tra role = 'admin'
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Không được phép, chỉ dành cho admin' });
  }
};
