const express = require('express')
const router = express.Router()

const Category = require('../models/category')
const Product = require('../models/product')


// Get Products
router.get(`/`, async (req, res) => {
  const productList = await Product.find({}).populate('category')
  // Get Specific fields only
  // const productList = await Product.find({}).select('name image -_id')
  res.send(productList)
})


// GET Single Product by ID
router.get('/:id', async (req, res) => {
  let product = await Product.findById(req.params.id).populate('category')

  if (!product) {
    return res.status(500).send({ message: "Product could not be found" })
  }
  res.send(product)
})


// Add Product
router.post(`/`, async (req, res) => {
  // Validate productCategoryId
  const category = await Category.findById(req.body.category)

  if (!category) {
    return res.status(400).send('Invalid category')
  }

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    images: req.body.images,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured
  })

  product = await product.save()

  if(!product) {
    return res.status(500).send({ message: "Product can not be created" })
  }
  res.send(product)
})

// Update Product 
router.put('/:id', async(req, res) => {
  let product = await Product.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    images: req.body.images,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured
  })

  if (!product) {
    return res.status(404).send({ success: false, message: `Product with id ${req.params.id} could not be found` })
  }
  res.send(product)
})


module.exports = router