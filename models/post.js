export default (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'user_id',
        },
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'categories',
          key: 'category_id',
        },
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    }, {
      timestamps: false,
      tableName: 'posts',
      paranoid: true,
    });
  
    Post.associate = models => {
      Post.belongsTo(models.User, { foreignKey: 'user_id' });
      Post.belongsTo(models.Category, { foreignKey: 'category_id' });
      Post.hasMany(models.Comment, { foreignKey: 'post_id' });
      Post.belongsToMany(models.Tag, { through: models.PostTag, foreignKey: 'post_id' });
    };
  
    return Post;
  };
  