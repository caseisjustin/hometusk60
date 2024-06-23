import models from '../models/index.js';

const createComment = async (req, res) => {
  const { post_id, body } = req.body;
  const comment = await models.Comment.create({
    post_id,
    user_id: req.user.user_id,
    body,
  });
  res.status(201).json({ comment });
};

const getComment = async (req, res) => {
  const comment = await models.Comment.findByPk(req.params.id);
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }
  res.status(200).json({ comment });
};

const updateComment = async (req, res) => {
  const { body } = req.body;
  const comment = await models.Comment.findByPk(req.params.id);
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }
  comment.body = body;
  await comment.save();
  res.status(200).json({ comment });
};

const deleteComment = async (req, res) => {
  const comment = await models.Comment.findByPk(req.params.id);
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }
  await comment.destroy();
  res.status(200).json({ message: 'Comment deleted' });
};

const getAllComments = async (req, res) => {
  const comments = await models.Comment.findAll();
  res.status(200).json({ comments });
};

export { createComment, getComment, updateComment, deleteComment, getAllComments };
