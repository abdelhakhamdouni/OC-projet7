const helmet = require('helmet'); // Protection certaines vulnérabilités connues du web en configurant correctement les headers
const dotenv = require('dotenv').config();// Initialisation de dotenv
const cors = require('cors');



const express = require('express'); // Framework pour Node.js
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser'); // Parser JSON pour rendre exploitables les objets retournés

const path = require('path'); // Nécessaire pour Multer (importation d'image )

const postRoutes = require('./routes/post'); // Déclaration du chemin pour les routes posts
const userRoutes = require('./routes/user'); // Déclaration du chemin pour les routes User
const commentRoutes = require('./routes/comment'); // Déclaration du chemin pour les routes comments

const app = express();

// Création de la base et des tables si inexistantes

var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPassword,
});

/*con.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  con.query(`CREATE DATABASE IF NOT EXISTS ${process.env.dbName}`, (errQ) => {
    if (errQ) throw errQ;
    process.env.dbCreated = true;
  });
});*/

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images'))); // Indication pour servir en Static les requêtes images vers le dossier image

app.use('/api/posts', postRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;
