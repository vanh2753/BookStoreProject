const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');
const Order = require('./Order');
const Book = require('./Book');

class OrderDetail extends Model { }

OrderDetail.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },

    },
    {
        timestamps: true,
        sequelize,
        modelName: 'OrderDetail',
    }
);

OrderDetail.belongsTo(Book, { as: 'book', foreignKey: 'book_id' });
Book.hasMany(OrderDetail, { as: 'orderDetails', foreignKey: 'book_id' });
module.exports = OrderDetail;