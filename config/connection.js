const Sequelize = require('sequelize');
require('dotenv').config();

console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD);
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
       //port: 5432,
    });

module.exports = sequelize;