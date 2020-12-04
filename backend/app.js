const express = require('express');
const bodyParser = require("body-parser");
const { sequelize } = require('./connexiondb');




const app = express();


app.use((req, res, next) => // contourner les erreur de CORS (Système de sécurité CORS : Cross Origin Resource Sharing 
{ res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue ok !' }); 
});



module.exports = app;