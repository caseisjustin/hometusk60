export default (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      comment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'posts',
          key: 'post_id',
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'user_id',
        },
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
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
      tableName: 'comments',
      paranoid: true,
    });
  
    Comment.associate = models => {
      Comment.belongsTo(models.Post, { foreignKey: 'post_id' });
      Comment.belongsTo(models.User, { foreignKey: 'user_id' });
    };
  
    return Comment;
  };
  