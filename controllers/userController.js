import models from '../models/index.js';

const getUserPosts = async (req, res) => {
  const posts = await models.Post.findAll({ where: { user_id: req.params.user_id } });
  res.status(200).json({ posts });
};

export { getUserPosts };
