import otpGenerator from 'otp-generator';
import config from '../config/config.js';
import jwt from 'jsonwebtoken';
import models from '../models/index.js';

const generateOTP = (req, res, next) => {
  const otp = otpGenerator.generate(6, { digits: true });
  req.otp = otp;
  next();
};

const verifyOTP = async (req, res, next) => {
  const { otp } = req.body;
  const { otp: expectedOtp } = req.user;

  if (otp !== expectedOtp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  req.user.isVerified = true;
  await req.user.save();
  next();
};

export { generateOTP, verifyOTP };
