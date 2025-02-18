const { Model, where, or } = require('sequelize');
const Order = require('../models/Order')
const Book = require('../models/Book')
const User = require('../models/User')
const OrderDetail = require('../models/OrderDetail')
const jwt = require('jsonwebtoken');
const { getUserByToken } = require('../services/userService');
const { getOrderDetail } = require('./orderDetailController');
const { fetchOrderDetail } = require('../services/orderService');
require('dotenv').config();

const initOrder = async (req, res) => {
    try {
        let user = await getUserByToken(req)
        let order = await Order.findOne({ where: { buyer_id: user.id, status: 'cart' } })

        //nếu chưa có order thì tạo mới:
        if (!order) {
            let order = await Order.create({
                status: 'cart',
                buyer_id: user.id,
                total_amount: 0
            })
            return res.status(200).json({
                EC: 0,
                message: "init order success",
                data: order
            })
        }

        return res.status(200).json({
            EC: 0,
            message: "Order exist",
            data: order
        })

    } catch (error) {
        return res.status(500).json({
            EC: 1,
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

const confirmOrder = async (req, res) => {
    try {
        let user = await getUserByToken(req)
        let currentOrder = await Order.findOne({ where: { buyer_id: user.id, status: 'cart' } })
        let itemOrder = await fetchOrderDetail(req)
        let itemOrderArr = itemOrder.map((item) => item.dataValues)

        const caculateTotal = itemOrderArr.reduce((total, index) => {
            return total + index.quantity * parseFloat(index.price)
        }, 0) // Thêm 0 là giá trị khởi tạo, còn không thì reduce sẽ lấy giá trị đầu tiên của mảng 

        if (!currentOrder) {
            return res.status(500).json({
                EC: 1,
                message: 'No order exist',
                error: error,
            });
        }
        else {
            await currentOrder.update({
                status: 'confirmed',
                buyer_id: user.id,
                total_amount: caculateTotal
            })
            return res.status(200).json({
                EC: 0,
                message: "update success",
                data: {
                    orderId: currentOrder.id,
                    total_amount: currentOrder.total_amount,
                    status: currentOrder.status,
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            EC: 1,
            message: 'something went wrong',
            error: error,
        });
    }

}

module.exports = {
    //getAllOrders,  getOrderById,  deleteOrder,
    initOrder,
    confirmOrder
}