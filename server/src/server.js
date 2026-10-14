import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import connectDB from './config/db.js';
import businessInfo from './config/business.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import menuRoutes from './routes/menuRoutes.js';
import specialRoutes from './routes/specialRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

app.use(cors({
  origin: process.env.CLIENT_URL || ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 300,
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes.' }
});
app.use('/api', limiter);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Base Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Lemon Café Showcase API',
    version: '1.0.0'
  });
});

// Single Source of Truth Business Route
app.get('/api/business', (req, res) => {
  res.json({
    success: true,
    data: businessInfo
  });
});

// Mount Public API Routes
app.use('/api', menuRoutes);
app.use('/api', specialRoutes);
app.use('/api', enquiryRoutes);
app.use('/api/admin', adminRoutes);

// Centralized Error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[Lemon Server]: Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
