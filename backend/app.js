const express = require('express');
const bodyParser = require("body-parser");
const { sequelize } = require('./connexiondb');
const db = require("./models")
db.sequelize.sync()

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

const path = require('path');

const app = express();


app.use((req, res, next) => // contourner les erreur de CORS (Système de sécurité CORS : Cross Origin Resource Sharing 
{ res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);



app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue ok !' }); 
});



module.exports = app;