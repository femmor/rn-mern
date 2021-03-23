const express = require('express')
const router = express.Router()

const Product = require('../models/product')

// Get Products
router.get(`/`, async (req, res) => {
  const productList = await Product.find({})
  .then()
  res.send(productList)
})

// Post Products
router.post(`/`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    productImg: req.body.productImg,
    countInStock: req.body.countInStock
  })

  product.save()
  .then(createdProduct => {
    res.status(201).json(createdProduct)
  })
  .catch(err => {
    res.status(500).json({ error: err, success: false })
  })
})

module.exports = router