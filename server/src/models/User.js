const { DataTypes, Model } = require('sequelize');
const { sequelize } = require("../config/database");
const Order = require('./Order');

class User extends Model { };

User.init(
    // atrtributtes
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'buyer'),
            allowNull: false,
        },
    },
    //options
    {
        timestamps: true,
        sequelize, //force
        modelName: 'User' //force
    }
)

User.hasMany(Order, { as: 'orders', foreignKey: 'buyer_id' });
Order.belongsTo(User, { as: 'buyer', foreignKey: 'buyer_id' });
module.exports = User