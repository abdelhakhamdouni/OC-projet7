const dotenv = require ('dotenv') . config ( )
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASS, { dialect: "mysql",  host: process.env.DB_HOST });

const db = async function () {
    try {
      await sequelize.authenticate();
      console.log('Connexion réussi !');
    } catch (error) {
      console.error('Connexion échouée !', error);
    }
  };
  db();

module.exports= sequelize