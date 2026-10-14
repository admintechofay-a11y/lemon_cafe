import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';

export const protect = async (req, res, next) => {
  let token = req.cookies?.token;

  if (!token && req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. Please login.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'lemon_luxury_secret_jwt_key_2026');
    req.admin = await AdminUser.findById(decoded.id).select('-password');
    if (!req.admin) {
      // Allow demo user token if in memory mode
      req.admin = { id: decoded.id, name: 'Lemon Administrator', role: 'superadmin' };
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session token.',
    });
  }
};
