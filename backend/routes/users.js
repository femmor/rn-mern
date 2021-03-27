const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()

const User = require('../models/user')

// Get all Users
router.get('/', async (req, res) => {
  const users = await User.find({}).select('-passwordHash')

  if (!users) {
    res.status(500).json({ success: false })
  }
  res.send(users)
})


// Create a user
// router.post('/', async(req, res) => {
//   let user = new User({

//     name: req.body.name,
//     email: req.body.email,
//     passwordHash: bcrypt.hashSync(req.body.password, 10),
//     phone: req.body.phone,
//     street: req.body.street,
//     isAdmin: req.body.isAdmin,
//     apartment: req.body.apartment,
//     city: req.body.city,
//     zip: req.body.zip,
//     country: req.body.country
//   })
  
//   user = await user.save()

//   if(!user) {
//     return res.status(404).send('User can not be created!')
//   }
//   res.send(user)
// })

// Get User byID
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select('-passwordHash')

  if(!user) {
    res.status(500).send({ success: false, message: `The user with the id ${req.params.id} can not be found` })
  }
  res.status(200).send(user)
})

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  const secret = process.env.secret

  if(!user){
    return res.status(400).send("User not found")
  }

  if(user && bcrypt.compareSync(password, user.passwordHash)){
    const token = jwt.sign({
      userId: user.id,
      // Send extra user data to the frontend
      isAdmin: user.isAdmin
    }, secret, {
      expiresIn: '1d'
    })

    res.status(200).send({ user: user.email, token: token })
  }
  return res.status(400).send("Password is wrong")
  
})

// Register User Endpoint
router.post("/register", async (req, res) => {
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
    return res.status(404).send('The user cannot be created')
  }
  res.send(user)
  
})

// Get users count for statistics
router.get('/get/count', async (req, res) => {
  const usersCount = await User.countDocuments(count => count)

  if (!usersCount) {
    res.status(505).json({ success: false, message: 'Users are empty' })
  }
  res.send({usersCount})
})

// Update user
router.put('/:id', async(req, res) => {
  const userExist = await User.findById(req.params.id)
  let newPassword
  if (req.body.password) {
    newPassword = bcrypt.hashSync(req.body.password, 10)
  } else {
    newPassword = userExist.passwordHash
  }

  const user = await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      passwordHash: newPassword,
      phone: req.body.phone,
      street: req.body.street,
      isAdmin: req.body.isAdmin,
      apartment: req.body.apartment,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country
    }, {new: true}
  )

  if(!user)
  return res.status(400).send('The user cannot be updated')

  res.send(user)
})


// Delete a user
router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id)
  .then(user => {
    if(user) {
      return res.status(200).json({ success: true, message: 'User deleted' })
    } else {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
  })
  .catch(err => {
    return res.status(400).json({ success: false, error: err })
  })
})

module.exports = router