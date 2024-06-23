export default (sequelize, DataTypes) => {
    const PostTag = sequelize.define('PostTag', {
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'posts',
          key: 'post_id',
        },
      },
      tag_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'tags',
          key: 'tag_id',
        },
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      timestamps: false,
      tableName: 'post_tags',
    });
  
    return PostTag;
  };
  