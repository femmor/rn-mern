const express = require("express")
const app = express();
const morgan = require("morgan")
const mongoose = require('mongoose')
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

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Database connected!')
})
.catch(err => console.log(err))

// Post Products
app.post(`${api}/products`, (req, res) => {
  const newProduct = req.body
  console.log(newProduct)
  res.send(newProduct)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})