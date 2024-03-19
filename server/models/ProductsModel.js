const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const Products = db.define('products', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    freezeTableName: true
});

module.exports = Products;

(async () => {
    await db.sync();
})();

