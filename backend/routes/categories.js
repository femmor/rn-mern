const express = require('express')
const router = express.Router()

const Category = require('../models/category')

// Get all categories
router.get('/', async (req, res) => {
  const categoriesList = await Category.find({})
  
  if(!categoriesList){
    res.status(500).json({ success: false })
  }
  res.send(categoriesList)
})

// Create a category
router.post('/', async(req, res) => {
  let category = new Category({
    name: req.body.name,
    color: req.body.color,
    icon: req.body.icon,
    image: req.body.image
  })

  category = await category.save()
  
  if(!category) {
    return res.status(404).send('Category can not be created!')
  }
  res.send(category)
})

// Delete a category
router.delete("/:id", (req, res) => {
  Category.findByIdAndRemove(req.params.id)
  .then(category => {
    if(category) {
      return res.status(200).json({ success: true, message: 'Category deleted' })
    } else {
      return res.status(404).json({ success: false, message: 'Category not found' })
    }
  })
  .catch(err => {
    return res.status(400).json({ success: false, error: err })
  })
  
})

module.exports = router