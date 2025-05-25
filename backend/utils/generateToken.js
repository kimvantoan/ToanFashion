import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.cookie('jwt', token, {
    httpOnly: true,          // bảo vệ khỏi XSS
    secure: process.env.NODE_ENV === 'production', // HTTPS only trong production
    sameSite: 'strict',      // ngăn CSRF
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 ngày
  });
};

export default generateToken;
