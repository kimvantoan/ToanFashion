import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// [POST] /api/users/register
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'Email đã được sử dụng' });

    const user = await User.create({ username, email, password });

    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: 'Đăng ký thất bại', error: err.message });
  }
};

// [POST] /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });

    generateToken(res, user._id);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: 'Đăng nhập thất bại', error: err.message });
  }
};

// [POST] /api/users/logout
export const logoutUser = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
  res.json({ message: 'Đăng xuất thành công' });
};

// [GET] /api/users/profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// [PUT] /api/users/profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (err) {
    res.status(500).json({ message: 'Cập nhật thất bại', error: err.message });
  }
};
