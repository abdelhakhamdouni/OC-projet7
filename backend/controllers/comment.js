const sequelize = require('../connexiondb');
const { Sequelize, DataTypes } = require('sequelize');
const Comment = require('../models/comment')(sequelize, DataTypes);

const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.createComment = (req, res, next) => {
  const createComment = req.body
  //const postObject = JSON.parse(req.body.post);
  //delete postObject._id;
  const comment = new Comment({
    ...createComment,
  //imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sequelize.query(`INSERT INTO comments (content,postId,userId) VALUES ('${comment.content}','${comment.postId}', '${comment.userId}'`)
    .then(() => res.status(201).json({ message: 'Commentaire enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};
  
exports.modifyComment = (req, res, next) => {
  const comment /*Object*/  = req.body
  sequelize.query(`UPDATE comments SET commentaires='${comment.content}' ,postId='${comment.postId}' ,usterId='${comment.userId}' WHERE id= '${req.params.id}'`)
    .then(() => res.status(200).json({ message: 'Commentaire modifié !'}))
    .catch(error => res.status(400).json({ error }));
};
exports.deleteComment = (req, res, next) => {
  sequelize.query(`DELETE FROM comments WHERE id ='${req.params.id}' `)
          .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
          .catch(error => res.status(400).json({ error }));
};

exports.getOneComment =(req, res, next) => {
  sequelize.query("SELECT * FROM comments")
      .then(comment => res.status(200).json(comment))
      .catch(error => res.status(404).json({ error }));
  };

exports.getAllComment = (req, res, next) => {
    sequelize.query("SELECT * FROM comments")
       .then(comments => res.status(200).json(comments))
       .catch(error => res.status(400).json({ error }));
   };