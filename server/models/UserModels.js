const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('users', {
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = User;

(async () => {
    await db.sync();
})();