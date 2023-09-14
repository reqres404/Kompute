const Sequelize = require('sequelize');
require("dotenv").config()

const sequelize = new Sequelize('kompute', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;