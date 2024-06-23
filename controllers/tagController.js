import models from '../models/index.js';

const createTag = async (req, res) => {
  const { name } = req.body;
  const tag = await models.Tag.create({ name });
  res.status(201).json({ tag });
};

const getTag = async (req, res) => {
  const tag = await models.Tag.findByPk(req.params.id);
  if (!tag) {
    return res.status(404).json({ message: 'Tag not found' });
  }
  res.status(200).json({ tag });
};

const updateTag = async (req, res) => {
  const { name } = req.body;
  const tag = await models.Tag.findByPk(req.params.id);
  if (!tag) {
    return res.status(404).json({ message: 'Tag not found' });
  }
  tag.name = name;
  await tag.save();
  res.status(200).json({ tag });
};

const deleteTag = async (req, res) => {
  const tag = await models.Tag.findByPk(req.params.id);
  if (!tag) {
    return res.status(404).json({ message: 'Tag not found' });
  }
  await tag.destroy();
  res.status(200).json({ message: 'Tag deleted' });
};

const getAllTags = async (req, res) => {
  const tags = await models.Tag.findAll();
  res.status(200).json({ tags });
};

const getPopularTags = async (req, res) => {
  const tags = await models.Tag.findAll({
    attributes: {
      include: [
        [
          models.sequelize.literal(`(
            SELECT COUNT(*)
            FROM post_tags AS post_tag
            WHERE post_tag.tag_id = Tag.tag_id
          )`),
          'post_count',
        ],
      ],
    },
    order: [[models.sequelize.literal('post_count'), 'DESC']],
    limit: 10,
  });
  res.status(200).json({ tags });
};

export { createTag, getTag, updateTag, deleteTag, getAllTags, getPopularTags };
