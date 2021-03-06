const express = require('express')
const router = express.Router()

const Order = require('../models/order')
const OrderItem = require('../models/order-item')

router.get('/', async (req, res) => {
  const ordersList = await Order.find({})

  if (!ordersList) {
    res.status(500).json({ success: false })
  }
  res.send(ordersList)
})

// Create an order
router.post('/', async(req, res) => {
  const orderItemsIds = Promise.all(req.body.orderItems.map(async orderItem => {
    let newOrderItem = new OrderItem({
      quantity: orderItem.quantity,
      product: orderItem.product
    })

    newOrderItem = await newOrderItem.save()
    return newOrderItem._id
  }))

  const orderItemsIdsResolved = await orderItemsIds

  let order = new Order({
    orderItems: orderItemsIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: req.body.totalPrice,
    user: req.body.user,
  })

  order = await order.save()
  
  if(!order) {
    return res.status(404).send('Order can not be created!')
  }
  res.send(order)
})

module.exports = router