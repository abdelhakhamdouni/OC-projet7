const bcrypt = require('bcrypt'); // Plugin de hash pour la sécurité des password
const jwt = require('jsonwebtoken'); // Token de protection
const rateLimit = require('express-rate-limit'); // Protection contre le brute-force
const User = require('../models/User'); // Chemin d'accès au modèle USER

exports.signup = (req, res, next) => {
  console.log(req.body);
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    image_URL: 'http://localhost:3000/images/icon-small.png'
  };

  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((userCreated) => {
              res.json({ status: `${userCreated.email} enregistré!` });
            })
            .catch((errCreate) => {
              res.send(`error: ${errCreate}`);
            });
        });
      } else {
        res.json({ error: `${req.body.email} existe déjà!` });
      }
    })
    .catch((errGlo) => {
      res.send(`error: ${errGlo}`);
    });
};

exports.login = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur ou mot de passe erroné' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Utilisateur ou mot de passe erroné' });
          }
          res.status(200).json({
            token: jwt.sign(
              { id: user.id }, process.env.SECRET_KEY,
              { expiresIn: '24h' },
            ),
            userId: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            image_URL: user.image_URL,
            
          });
          console.log(`${user.email} s'est connecté`);
        });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

exports.deleteAccount = (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((num) => {
      if (num === 1) {
        res.send({ message: 'Votre compte a été supprimé.' });
      } else {
        res.send({ message: num });
      }
    });
};

exports.userInfo = (req, res, next) => {
  User.findOne({
    where: {
      email: req.params.email,
    },
  })
    .then((user) => {
      if (user) {
        const userInfo = {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          image_URL: user.image_URL,
        };
        res.status(200).json(userInfo);
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.usersInfo = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.changeInfo = (req, res, next) => {
  let imagePath = '';
  if (req.file) {
    imagePath = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  } else {
    imagePath = '';
  }

  const userObject = req.file
    ? {
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      image_URL: imagePath,
    } : { ...req.body };
  User.update({ ...userObject }, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.status(200).json({ ...userObject }))
    .catch((error) => res.status(400).json({ error }));
};


exports.rateLimit = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 3,
});
