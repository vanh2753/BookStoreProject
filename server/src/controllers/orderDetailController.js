const { Model, where } = require('sequelize');
const Order = require('../models/Order')
const Book = require('../models/Book');
const OrderDetail = require('../models/OrderDetail');
const { getUserByToken } = require('../services/userService');
const { fetchOrderDetail } = require('../services/orderService');

const createOrderDetail = async (req, res) => {
    try {
        let user = await getUserByToken(req)
        let order = await Order.findOne({ where: { buyer_id: user.id, status: 'cart' } })

        let { quantity, book_id } = req.body
        console.log(quantity, "and ", book_id)
        let book = await Book.findByPk(book_id)

        if (!book) {
            return res.status(404).json({ EC: 1, error: "Book not found" });
        }

        const item = await OrderDetail.create({
            quantity: quantity,
            price: book.price,
            book_id: book_id,
            order_id: order.id

        })
        return res.status(200).json({
            EC: 0,
            data: item
        })
    } catch (error) {
        return res.status(500).json({
            EC: 1,
            error: "ngu dot"
        })
    }
}

const getOrderDetail = async (req, res) => {
    try {
        const item = await fetchOrderDetail(req)
        return res.status(200).json({
            EC: 0,
            data: item
        })
    } catch (error) {
        return res.status(500).json({
            EC: 1,
            error: error
        })
    }
}

module.exports = { createOrderDetail, getOrderDetail }