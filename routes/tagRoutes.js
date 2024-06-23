import { Router } from 'express';
import { createTag, getTag, updateTag, deleteTag, getAllTags, getPopularTags } from '../controllers/tagController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', authMiddleware, createTag);
router.get('/:id', getTag);
router.put('/:id', authMiddleware, updateTag);
router.delete('/:id', authMiddleware, deleteTag);
router.get('/', getAllTags);
router.get('/popular', getPopularTags);

export default router;
