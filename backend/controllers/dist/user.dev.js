"use strict";

var sequelize = require('../connexiondb');

var _require = require('sequelize'),
    Sequelize = _require.Sequelize,
    DataTypes = _require.DataTypes;

var User = require('../models/User')(sequelize, DataTypes);

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

exports.signup = function (req, res, next) {
  bcrypt.hash(req.body.password, 10).then(function (hash) {
    var user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash
    });
    sequelize.query("INSERT INTO users(firstName, lastName, email, password) VALUES('".concat(user.firstName, "','").concat(user.lastName, "','").concat(user.email, "','").concat(user.password, "')")).then(function () {
      return res.status(201).json({
        message: 'Votre compte à bien été créer !'
      });
    })["catch"](function (error) {
      return res.status(400).json({
        error: error
      });
    });
  })
  /*user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé'}))
          .catch(error => res.status(400).json({ error }));
  })*/
  ["catch"](function (error) {
    return res.status(500).json({
      error: error
    });
  });
};

exports.login = function (req, res, next) {
  User.findOne({
    email: req.body.email
  }).then(function (user) {
    if (!user) {
      return res.status(401).send({
        error: error
      });
    }

    bcrypt.compare(req.body.password, user.password).then(function (valid) {
      if (!valid) {
        return res.status(401).json({
          error: 'Mot de passe incorrect !'
        });
      }

      res.status(200).json({
        userId: user._id,
        token: jwt.sign({
          userId: user._id
        }, 'RANDOM_TOKEN_SECRET', {
          expiresIn: '24h'
        })
      });
    })["catch"](function (error) {
      return res.status(500).json({
        error: error
      });
    });
  })["catch"](function (error) {
    return res.status(500).json({
      error: error
    });
  });
};

exports.modifyUser = function (req, res, next) {
  bcrypt.hash(req.body.password, 10).then(function (hash) {
    var user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash
    });
    sequelize.query("UPDATE users SET firstname='".concat(user.firstname, "',lastname='").concat(user.lastname, "',email='").concat(user.email, "',password='").concat(user.password, "' WHERE user_id= '").concat(req.params.id, "'")).then(function () {
      return res.status(200).json({
        message: 'Information utilisateur modifié !'
      });
    })["catch"](function (error) {
      return res.status(400).json({
        error: error
      });
    });
  })["catch"](function (error) {
    return res.status(500).json({
      error: error
    });
  });
};

exports.deleteUser = function (req, res, next) {
  sequelize.query("DELETE FROM users WHERE user_id ='".concat(req.params.id, "' ")).then(function () {
    return res.status(200).json({
      message: 'Compte supprimé !'
    });
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
};