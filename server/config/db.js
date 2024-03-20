const { Sequelize } = require("sequelize");
const dotenv = require('dotenv').config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, '', {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
});

module.exports = db;