import models from '../models/index.js';

const createCategory = async (req, res) => {
  const { name } = req.body;
  const category = await models.Category.create({ name });
  res.status(201).json({ category });
};

const getCategory = async (req, res) => {
  const category = await models.Category.findByPk(req.params.id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.status(200).json({ category });
};

const updateCategory = async (req, res) => {
  const { name } = req.body;
  const category = await models.Category.findByPk(req.params.id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  category.name = name;
  await category.save();
  res.status(200).json({ category });
};

const deleteCategory = async (req, res) => {
  const category = await models.Category.findByPk(req.params.id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  await category.destroy();
  res.status(200).json({ message: 'Category deleted' });
};

const getAllCategories = async (req, res) => {
  const categories = await models.Category.findAll();
  res.status(200).json({ categories });
};

export { createCategory, getCategory, updateCategory, deleteCategory, getAllCategories };
