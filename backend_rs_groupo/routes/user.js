const express = require('express');

const users = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

users.post('/signup', userCtrl.signup);
users.post('/login', userCtrl.rateLimit, userCtrl.login);
users.delete('/delete/:id', auth, userCtrl.deleteAccount);
users.get('/userInfo/:email', auth, userCtrl.userInfo);
users.get('/usersInfo', auth, userCtrl.usersInfo);
users.put('/:id', auth, multer, userCtrl.changeInfo);


module.exports = users;
