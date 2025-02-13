const Book = require("./Book");
const Order = require("./Order");
const OrderDetail = require("./OrderDetail");
const User = require("./User");

OrderDetail.hasMany(Book, { as: 'books', foreignKey: 'book_id' })
Order.hasOne(OrderDetail, { as: 'items', foreignKey: "orderDetail_id" })
User.hasMany(Order, { as: 'orders', foreignKey: "order_id" })