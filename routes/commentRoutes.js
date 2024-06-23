import { Router } from 'express';
import { createComment, getComment, updateComment, deleteComment, getAllComments } from '../controllers/commentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', authMiddleware, createComment);
router.get('/:id', getComment);
router.put('/:id', authMiddleware, updateComment);
router.delete('/:id', authMiddleware, deleteComment);
router.get('/', getAllComments);

export default router;
