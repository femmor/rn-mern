const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../models/user')

// Get all Users
router.get('/', async (req, res) => {
  const usersList = User.find({})

  if (!usersList) {
    res.status(500).json({ success: false })
  }
  res.send(usersList)
})


// Create a user
router.post('/', async(req, res) => {
  let user = new User({

    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    street: req.body.street,
    isAdmin: req.body.isAdmin,
    apartment: req.body.apartment,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country
  })
  
  user = await user.save()

  if(!user) {
    return res.status(404).send('User can not be created!')
  }
  res.send(user)
})

module.exports = router