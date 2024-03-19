const { Sequelize } = require("sequelize");

const db = new Sequelize('toqqo', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = db;