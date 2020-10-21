const Sequelize = require('sequelize');
 
const dbConnection = new Sequelize(
    process.env.DB_DATABASE, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
);

dbConnection.authenticate()
 .then(() => {
   console.log('Connection has been established successfully.');
 })
 .catch(err => {
   console.error('Unable to connect to the database:', err);
 });

//dbConnection.sync({force: true});

const db = {};
 
db.users = require('../models/user')(dbConnection, Sequelize);
db.rols = require('../models/rol')(dbConnection, Sequelize);
 
db.dbConnection = dbConnection;
db.Sequelize = Sequelize;
module.exports = db;