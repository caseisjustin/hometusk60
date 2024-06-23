import { Sequelize } from 'sequelize';
import config from '../config/config.js';
import User from './user.js';
import Post from './post.js';
import Comment from './comment.js';
import Category from './category.js';
import Tag from './tag.js';
import PostTag from './postTag.js';

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect,
});

const models = {
  User: User(sequelize, Sequelize.DataTypes),
  Post: Post(sequelize, Sequelize.DataTypes),
  Comment: Comment(sequelize, Sequelize.DataTypes),
  Category: Category(sequelize, Sequelize.DataTypes),
  Tag: Tag(sequelize, Sequelize.DataTypes),
  PostTag: PostTag(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach(key => {
  if (models[key].associate) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;
