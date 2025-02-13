const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const OrderDetail = require("./OrderDetail");
class Order extends Model { }

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.ENUM('cart', 'confirmed', 'completed', 'cancelled'),
            allowNull: false,
        },
        total_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },

    },
    {
        timestamps: true,
        sequelize,
        modelName: 'Order',
    }
);

Order.hasMany(OrderDetail, { as: 'orderDetails', foreignKey: 'order_id' });
OrderDetail.belongsTo(Order, { as: 'order', foreignKey: 'order_id' });
module.exports = Order;