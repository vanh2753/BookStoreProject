const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');
const OrderDetail = require('./OrderDetail');

class Book extends Model { }

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
        },
        genres: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        image_url: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        stock_quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

    },
    {
        timestamps: true,
        sequelize,
        modelName: 'Book',
    }
);



module.exports = Book;