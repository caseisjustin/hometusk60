export default (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
      tag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
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
      tableName: 'tags',
      paranoid: true,
    });
  
    Tag.associate = models => {
      Tag.belongsToMany(models.Post, { through: models.PostTag, foreignKey: 'tag_id' });
    };
  
    return Tag;
  };
  