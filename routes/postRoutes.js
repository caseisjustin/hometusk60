import { Router } from 'express';
import { createPost, getPost, updatePost, deletePost, getAllPosts } from '../controllers/postController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', authMiddleware, createPost);
router.get('/:id', getPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);
router.get('/', getAllPosts);

export default router;
