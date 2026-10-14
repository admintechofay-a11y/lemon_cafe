import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import AdminUser from '../models/AdminUser.js';
import MenuItem from '../models/MenuItem.js';
import SpecialOfTheDay from '../models/SpecialOfTheDay.js';
import Enquiry from '../models/Enquiry.js';
import businessInfo from '../config/business.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'lemon_luxury_secret_jwt_key_2026';

// Helper to sign JWT
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
};

// @desc    Admin login
// @route   POST /api/admin/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    let user = null;
    if (mongoose.connection.readyState === 1) {
      user = await AdminUser.findOne({
        $or: [{ email: email.toLowerCase() }, { username: email.toLowerCase() }],
      });
    }

    // Default admin credentials fallback if fresh database: admin@lemonhousecafe.com / lemon123
    let isMatch = false;
    if (user) {
      isMatch = await user.matchPassword(password);
    } else if (
      (email === 'admin@lemonhousecafe.com' || email === 'admin') &&
      password === 'lemon123'
    ) {
      // Auto-create or allow demo login
      isMatch = true;
      user = { _id: 'admin_demo_id', name: 'Master Concierge Admin', email: 'admin@lemonhousecafe.com', role: 'superadmin' };
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Please verify your email and password.' });
    }

    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      admin: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Admin logout
// @route   POST /api/admin/logout
router.post('/logout', (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json({ success: true, message: 'Logged out successfully' });
});

// @desc    Get current admin user
// @route   GET /api/admin/me
router.get('/me', protect, (req, res) => {
  res.json({
    success: true,
    admin: req.admin,
  });
});

// --- MENU CRUD ---
// @desc    Create menu item
// @route   POST /api/admin/menu
router.post('/menu', protect, async (req, res, next) => {
  try {
    const { name, category, description, price, isVeg, isChefsPick, isMustTry, image, tags } = req.body;
    const newItem = await MenuItem.create({
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      description,
      price: Number(price),
      isVeg: isVeg ?? true,
      isChefsPick: Boolean(isChefsPick),
      isMustTry: Boolean(isMustTry),
      image: image || '/assets/optimized/poolside-cocktails.webp',
      tags: Array.isArray(tags) ? tags : (tags || '').split(',').map((t) => t.trim()),
    });
    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    next(err);
  }
});

// @desc    Update menu item
// @route   PUT /api/admin/menu/:id
router.put('/menu/:id', protect, async (req, res, next) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Menu item not found.' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
});

// @desc    Delete menu item
// @route   DELETE /api/admin/menu/:id
router.delete('/menu/:id', protect, async (req, res, next) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Menu item deleted successfully.' });
  } catch (err) {
    next(err);
  }
});

// --- TOMORROW'S SPECIALS ---
// @desc    Update Tomorrow's Special
// @route   PUT /api/admin/specials
router.put('/specials', protect, async (req, res, next) => {
  try {
    const { title, subtitle, dateText, dishes } = req.body;
    let special = await SpecialOfTheDay.findOne();
    if (!special) {
      special = await SpecialOfTheDay.create({ title, subtitle, dateText, dishes, isActive: true });
    } else {
      special.title = title || special.title;
      special.subtitle = subtitle || special.subtitle;
      special.dateText = dateText || special.dateText;
      if (dishes) special.dishes = dishes;
      await special.save();
    }
    res.json({ success: true, data: special });
  } catch (err) {
    next(err);
  }
});

// --- ENQUIRIES ---
// @desc    Get all guest enquiries
// @route   GET /api/admin/enquiries
router.get('/enquiries', protect, async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (err) {
    next(err);
  }
});

// @desc    Delete an enquiry
// @route   DELETE /api/admin/enquiries/:id
router.delete('/enquiries/:id', protect, async (req, res, next) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Enquiry record removed.' });
  } catch (err) {
    next(err);
  }
});

// --- BUSINESS & HOURS UPDATE ---
// @desc    Update contact / hours info
// @route   PUT /api/admin/business
router.put('/business', protect, (req, res) => {
  const { hours, phone, address, whatsapp } = req.body;
  if (hours) businessInfo.hours = hours;
  if (phone) businessInfo.phone = phone;
  if (address) businessInfo.address = address;
  if (whatsapp) businessInfo.whatsapp = whatsapp;

  res.json({ success: true, message: 'Business settings updated.', data: businessInfo });
});

export default router;
