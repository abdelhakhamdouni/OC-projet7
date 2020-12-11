'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.post.hasMany(models.Comment);

      models.post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
      });
      // define association here
    }
  }
  post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    imageURL: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};