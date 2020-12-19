const fs = require('fs');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');
const { Console } = require('console');

// Création de comment --OK
exports.createComment = (req, res, next) => {
  let imagePath = '';
  if (req.file) {
    imagePath = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  } else {
    imagePath = '';
  }

  const commentObject = {
    postId: req.body.postId,
    userId: req.body.created_user,
    body: req.body.body,
    image_URL: imagePath,
  };

  Comment.create(commentObject)
    .then(() => {
      Post.increment('commentCount', {
        where: {
          id: commentObject.postId,
        },
      })
        .then(() => res.status(200).json({ message: 'Compteur Commentaire augmenté' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

// Modification de comment -- OK
exports.modifyComment = (req, res, next) => {
  const commentObject = req.file ?
    {
      body: req.body.body,
      image_URL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : { ...req.body };
  Comment.update({ ...commentObject }, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.status(200).json({ message: 'Votre commentaire a été modifié!' }))
    .catch((error) => res.status(400).json({ error }));
};

// Suppression de comment -- OK
exports.deleteComment = (req, res, next) => {
  Comment.findOne({
    where: {
      id: req.params.id,
    },
  }).then((commentaire) => {
    const filename = commentaire.image_URL.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Comment.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then((num) => {
          if (num === 1) {
            res.send({ message: 'Votre commentaire a été supprimé.' });
          } else {
            res.send({ message: num });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    });
    Post.decrement('commentCount', {
      where: {
        id: commentaire.postId,
      },
    })
      .then(() => res.status(200).json({ message: 'Comment count retiré' }))
      .catch((error) => res.status(400).json({ error }));
  })
    .catch((error) => res.status(404).json({ error }));
};

// Retour de tous les comments -- Ok
exports.getComment = (req, res, next) => {
  User.findOne({ where: { id: req.user_id } })
    .then((user) => {
      Comment.findAll({ include: [{ model: Post, attributes: ['title', 'body', 'id', 'image_URL'] }, { model: User, attributes: ['first_name', 'last_name', 'id', 'image_URL'] }], raw: true, nest: true })
        .then((comments) => {
          res.status(200).json(comments);
        });
    })
    .catch((error) => res.status(400).json({ error }));
};

// Retour des comments d'un post -- OK
exports.getPostComments = (req, res, next) => {
  User.findOne({ where: { id: req.user_id } })
    .then((user) => {
      Comment.findAll({
        where: {
          postId: req.params.id,
        },
        include:
          [{ model: User, attributes: ['first_name', 'last_name', 'id', 'image_URL'] }],
        raw: true,
        nest: true,
      })
        .then((comments) => {
          res.status(200).json(comments);
        });
    })
    .catch((error) => res.status(400).json({ error }));
};
