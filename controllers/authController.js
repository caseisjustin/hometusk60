import models from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { generateOTP } from '../middlewares/otpMiddleware.js';

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await models.User.create({
    username,
    email,
    password: hashedPassword,
  });

  generateOTP(req, res, async () => {
    user.otp = req.otp;
    await user.save();
    // Send OTP to user via email (not implemented here)
    res.status(201).json({ message: 'User registered successfully. OTP sent to email.' });
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await models.User.findOne({ where: { email } });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user.user_id }, config.jwtSecret, { expiresIn: '1h' });
  res.status(200).json({ token });
};

const getUserProfile = async (req, res) => {
  const user = req.user;
  res.status(200).json({ user });
};

export { registerUser, loginUser, getUserProfile };
