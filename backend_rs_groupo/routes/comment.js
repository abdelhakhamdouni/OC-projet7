const express = require('express');

const comment = express.Router();

const commentCtrl = require('../controllers/comment');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

comment.post('/', auth, multer, commentCtrl.createComment);
comment.get('/', auth, multer, commentCtrl.getComment);
comment.get('/:id', auth, multer, commentCtrl.getPostComments);
comment.put('/:id', auth, multer, commentCtrl.modifyComment);
comment.delete('/:id', auth, multer, commentCtrl.deleteComment);

module.exports = comment;
