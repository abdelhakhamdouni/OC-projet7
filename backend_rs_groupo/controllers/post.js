const fs = require('fs');
const { Console } = require('console');
const { response } = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

// Création de post -- OK
exports.createPost = (req, res, next) => {
  let imagePath = '';
  if (req.file) {
    imagePath = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  } else {
    imagePath = '';
  }
  const postObject = {
    userId: req.body.created_id,
    title: req.body.title,
    body: req.body.body,
    image_URL: imagePath,
  };
  Post.create(postObject)
    .then(() => res.status(201).json({ message: 'Votre post est bien enregistré!' }))
    .catch((error) => res.status(400).json({ error }));
};

// Modification de post -- OK
exports.modifyPost = (req, res, next) => {
  const postObject = req.file
    ? {
      title: req.body.title,
      body: req.body.body,
      image_URL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : { ...req.body };
  Post.update({ ...postObject }, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.status(200).json({ message: 'Votre post a été modifié!' }))
    .catch((error) => res.status(400).json({ error }));
};

// Suppression de Post -- OK
exports.deletePost = (req, res, next) => {
  Comment.findAll({
    where: {
      postId: req.params.id,
    },
  })
    .then((commentaires) => {
      console.log(commentaires);
      if (commentaires.length > 0) {
        commentaires.forEach((commentaire) => {
          const filenameComment = commentaire.image_URL.split('/images/')[1];
          fs.unlink(`images/${filenameComment}`, () => {
            Comment.destroy({
              where: {
                postId: req.params.id,
              },
            })
              .then((num) => {
                if (num === 1) {
                  console.log('ok com supp');
                  res.send({ message: 'Votre commentaire a été supprimé.' });
                } else {
                  res.send({ message: num });
                }
              })
              .catch((error) => res.status(500).json({ error }));
          });
        });
      }
    })
    .catch((error) => res.status(404).json({ error }));
  Post.findOne({
    where: {
      id: req.params.id,
    },
  }).then((post) => {
    const filename = post.image_URL.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Post.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then((num) => {
          if (num === 1) {
            res.send({ message: 'Votre post a été supprimé.' });
          } else {
            res.send({ message: num });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    });
  })
    .catch((error) => res.status(404).json({ error }));
};

// Retour d'un Post -- OK
exports.getOnePost = (req, res, next) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

// Retour de tous les posts -- OK
exports.getAllPost = (req, res, next) => {
  Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
};
// Retour de tous les posts -- OK
/*exports.getAllPost = (req, res, next) => {
  User.findOne({ where: { id: req.user_id } })
    .then((user) => {
      const postLiked = user.post_liked.split(',').map((postID) => parseInt(postID, 10));
      Post.findAll({ include: [{ model: User, attributes: ['first_name', 'last_name', 'id', 'image_URL'] }], raw: true, nest: true })
        .then((posts) => {
        // const newPosts = posts.map((post) => {
        //   post.user = `${post.user.first_name} ${post.user.last_name}`;
        //   return post;
        // });
          posts.forEach((post) => {
            post.liked = postLiked.includes(post.id);
          });
          res.status(200).json(posts);
        });
    })
    .catch((error) => res.status(400).json({ error }));
};*/


// GetMyPost -- OK
exports.getMyPosts = (req, res, next) => {
  Post.findAll({
    where: {
      userId: req.params.id,
    },
  })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};


