import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { body, validationResult } from 'express-validator';

import User from '../models/User.js';
import { sendEmail } from '../config/email.js';

const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// POST /auth/register - create a new user (defaults to STORE_KEEPER)
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    try {
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Email is already registered' });
      }

      const user = await User.create({
        name,
        email,
        password,
        role: role === 'MANAGER' ? 'MANAGER' : 'STORE_KEEPER',
      });

      const token = generateToken(user._id);

      res.status(201).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Register error', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// POST /auth/login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const token = generateToken(user._id);

      res.json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Login error', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// POST /auth/forgot-password - send 4-digit OTP to email
router.post(
  '/forgot-password',
  [body('email').isEmail().withMessage('Valid email is required')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email } = req.body;

    try {
      const user = await User.findOne({ email }).select('+resetPasswordToken +resetPasswordExpires');
      if (!user) {
        // Do not reveal whether email exists
        return res.json({ success: true, message: 'If that email exists, an OTP has been sent.' });
      }

      // 4-digit numeric OTP
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const otpHash = crypto.createHash('sha256').update(otp).digest('hex');

      user.resetPasswordToken = otpHash;
      user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
      await user.save({ validateBeforeSave: false });

      await sendEmail({
        to: user.email,
        subject: 'Your Commodities Management OTP',
        html: `<p>You requested a password reset.</p><p>Your one-time password (OTP) is:</p><p style="font-size:24px;font-weight:bold;letter-spacing:4px;">${otp}</p><p>This code is valid for 60 minutes.</p>`,
      });

      res.json({ success: true, message: 'If that email exists, an OTP has been sent.' });
    } catch (error) {
      console.error('Forgot password error', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// POST /auth/reset-password-otp - verify OTP and set new password
router.post(
  '/reset-password-otp',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('otp').isLength({ min: 4, max: 4 }).withMessage('4-digit OTP is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, otp, password } = req.body;

    try {
      const otpHash = crypto.createHash('sha256').update(otp).digest('hex');
      const user = await User.findOne({
        email,
        resetPasswordToken: otpHash,
        resetPasswordExpires: { $gt: Date.now() },
      }).select('+resetPasswordToken +resetPasswordExpires +password');

      if (!user) {
        return res.status(400).json({ success: false, message: 'Reset link is invalid or expired' });
      }

      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      res.json({ success: true, message: 'Password has been reset successfully' });
    } catch (error) {
      console.error('Reset password error', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

export default router;
