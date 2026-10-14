import express from 'express';
import mongoose from 'mongoose';
import Enquiry from '../models/Enquiry.js';

const router = express.Router();

router.post('/enquiries', async (req, res, next) => {
  try {
    const { name, phone, email, guests, eventDate, message, type } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and phone number are required.',
      });
    }

    let saved = null;
    if (mongoose.connection.readyState === 1) {
      saved = await Enquiry.create({
        name,
        phone,
        email,
        guests: Number(guests) || 1,
        eventDate,
        message,
        type: type || 'General Visit',
      });
    }

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been received by our concierge. We look forward to welcoming you.',
      data: saved || { name, phone, type: type || 'General Visit' },
    });
  } catch (err) {
    next(err);
  }
});

// Admin-ready endpoint: GET /api/enquiries
router.get('/enquiries', async (req, res, next) => {
  try {
    let enquiries = [];
    if (mongoose.connection.readyState === 1) {
      enquiries = await Enquiry.find().sort({ createdAt: -1 });
    }
    res.json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
