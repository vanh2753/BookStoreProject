const express = require('express')
const router = express.Router();
const { getAllOrders, initOrder, confirmOrder } = require('../controllers/orderController')
const { createOrderDetail, getOrderDetail } = require('../controllers/orderDetailController')
const authToken = require('../middlewares/token')


router.post('/orders', authToken('buyer'), initOrder)
router.put('/orders', authToken('buyer'), confirmOrder)
// router.delete('orders/:id', deleteOrder)

//item
router.post('/order-detail', authToken('buyer'), createOrderDetail)
router.get('/order-detail', authToken('buyer'), getOrderDetail)
module.exports = router;