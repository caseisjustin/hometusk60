import { Router } from 'express';
import { getUserPosts } from '../controllers/userController.js';

const router = Router();

router.get('/:user_id/posts', getUserPosts);

export default router;
