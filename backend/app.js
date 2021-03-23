const express = require("express")
const app = express();
const morgan = require("morgan")
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = 5000

// Middleware
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
app.use(morgan('tiny'))

// Enable Cors
app.use(cors())
app.options('*', cors())

// DotENV
require('dotenv/config')

// Routes
const productsRoutes = require('./routes/products')
const categoriesRoutes = require('./routes/categories')
const usersRoutes = require('./routes/users')
const ordersRoutes = require('./routes/orders')

const api = process.env.API_URL

// Route APIs
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/categories`, categoriesRoutes)
app.use(`${api}/users`, usersRoutes)
app.use(`${api}/orders`, ordersRoutes)

// Connect to DB
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => {
  console.log('Database connected!')
})
.catch(err => console.log(err))

// Run app
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})