const express = require('express');
const router = express.Router();

const Comment = require('../models/comment');
const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');
const multer = require('../middleware/multer-config');

          //créer un commentaire
router.post('/', auth, commentCtrl.createComment);
          //modifier un commentaire
router.put('/:id', auth, commentCtrl.modifyComment);
          //supprimer un commentaire
router.delete('/:id', auth, commentCtrl.deleteComment);
          //affichage d'un commentaire spécifique
router.get('/:id', auth, commentCtrl.getOneComment);
          //récupération d'un commentaire
router.get('/', auth, commentCtrl.getAllComment);

module.exports = router;