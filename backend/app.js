const express = require("express")
const app = express();
const morgan = require("morgan")
const mongoose = require('mongoose')
const Product = require('./models/product')
const PORT = 5000

// Middleware
app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

app.use(morgan('tiny'))

require('dotenv/config')
const api = process.env.API_URL

// Get Products
app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: "hair dressing gum",
    image: "some_url",
  }
  res.send(product)
})

// Post Products
app.post(`${api}/products`, (req, res) => {
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

// Connect to DB
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Database connected!')
})
.catch(err => console.log(err))

// Run app
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})