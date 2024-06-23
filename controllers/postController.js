import models from '../models/index.js';

const createPost = async (req, res) => {
  const { title, body, category_id } = req.body;
  const post = await models.Post.create({
    user_id: req.user.user_id,
    title,
    body,
    category_id,
  });
  res.status(201).json({ post });
};

const getPost = async (req, res) => {
  const post = await models.Post.findByPk(req.params.id, {
    include: [models.Comment, models.Tag],
  });
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.status(200).json({ post });
};

const updatePost = async (req, res) => {
  const { title, body, category_id } = req.body;
  const post = await models.Post.findByPk(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  post.title = title;
  post.body = body;
  post.category_id = category_id;
  await post.save();
  res.status(200).json({ post });
};

const deletePost = async (req, res) => {
  const post = await models.Post.findByPk(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  await post.destroy();
  res.status(200).json({ message: 'Post deleted' });
};

const getAllPosts = async (req, res) => {
  const posts = await models.Post.findAll();
  res.status(200).json({ posts });
};

export { createPost, getPost, updatePost, deletePost, getAllPosts };
