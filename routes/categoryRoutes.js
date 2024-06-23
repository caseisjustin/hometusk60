import { Router } from 'express';
import { createCategory, getCategory, updateCategory, deleteCategory, getAllCategories } from '../controllers/categoryController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', authMiddleware, createCategory);
router.get('/:id', getCategory);
router.put('/:id', authMiddleware, updateCategory);
router.delete('/:id', authMiddleware, deleteCategory);
router.get('/', getAllCategories);

export default router;
