const express = require('express');

const post = express.Router();

const postCtrl = require('../controllers/post');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

post.get('/', auth, multer, postCtrl.getAllPost);
post.get('/:id', auth, multer, postCtrl.getOnePost);
post.post('/', auth, multer, postCtrl.createPost);
post.put('/:id', auth, multer, postCtrl.modifyPost);
post.delete('/:id', auth, multer, postCtrl.deletePost);
post.get('/myPosts/:id', auth, multer, postCtrl.getMyPosts);


module.exports = post;
