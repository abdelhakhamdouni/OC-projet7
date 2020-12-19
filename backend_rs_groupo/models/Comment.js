const Sequelize = require('sequelize');
const db = require('../database/db.js');
const User = require('./User');
const Post = require('./Post');

const Comment = db.sequelize.define(
  'comment',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    body: {
      type: Sequelize.TEXT,
      defaultValue: '',
    },
    image_URL: {
      type: Sequelize.STRING,
      defaultValue: '',
    },
    created_date: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  },
);

Comment.belongsTo(User);
Comment.belongsTo(Post);

module.exports = Comment;
