const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const Order = db.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productId: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    total: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    isProcessed: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        notNull: true
    }
});

module.exports = Order;

(async () => {
    await db.sync();
})();
