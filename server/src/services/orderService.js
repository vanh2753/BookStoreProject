const Order = require('../models/Order')
const { getUserByToken } = require('../services/userService');
const OrderDetail = require('../models/OrderDetail');
const Book = require('../models/Book')

const fetchOrderDetail = async (req) => {
    let user = await getUserByToken(req)
    let order = await Order.findOne({ where: { buyer_id: user.id, status: 'cart' } })

    let item = await OrderDetail.findAll({
        where: { order_id: order.id },
        include: [
            {
                model: Book,
                as: 'book',
                attributes: ['title']
            }
        ]
    })
    return item
}

module.exports = { fetchOrderDetail }