const sequelize = require('../connexiondb');
const { Sequelize, DataTypes } = require('sequelize');
const Post = require('../models/post')(sequelize, DataTypes);

const fs = require('fs');
const jwt = require('jsonwebtoken');

//créer un post
exports.createPost = (req, res, next) => {
    const PostObject = JSON.parse(req.body.Post)
    const Post = new Post({
      ...PostObject,
    image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    .then(post=>{res.json(post);})
   /* sequelize.query(`INSERT INTO posts(userId,title,content,image_url) VALUES ('${post.userId}','${post.title}',${post.content}','${post.image_url}')`)
      .then(() => res.status(201).json({ message: 'Post enregistré !'}))
      .catch(error => res.status(400).json({ error }));*/
  };
 
  //modifier un post
  exports.modifyPost = (req, res, next) => {
    const post /*Object*/= req.body
    sequelize.query(`UPDATE posts SET title='${post.title}' ,content='${post.content}' ,image_url='${post.image_url}' ,WHERE id= '${req.params.id}'`)
      .then(() => res.status(200).json({ message: 'Post modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };
  
  //supprimer un post
  exports.deletePost = (req, res, next) => {
    sequelize.query(`DELETE FROM posts WHERE id ='${req.params.id}' `)
            .then(() => res.status(200).json({ message: 'Post supprimé !'}))
            .catch(error => res.status(400).json({ error }));
  };
 
  //affichage d'un post spécifique
  exports.getOnePost = (req, res, next) => {
    sequelize.query("SELECT * FROM posts")
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
    };
  
    //récupération d'un post
  exports.getAllPost = (req, res, next) => {
      sequelize.query("SELECT * FROM posts")
         .then(posts => res.status(200).json(posts))
         .catch(error => res.status(400).json({ error }));
     };
     