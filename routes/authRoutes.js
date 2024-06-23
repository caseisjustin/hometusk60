import { Router } from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { verifyOTP } from '../middlewares/otpMiddleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUserProfile);
router.post('/verify-otp', authMiddleware, verifyOTP, getUserProfile);

export default router;
