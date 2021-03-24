const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({

})

// Virtuals
orderSchema.virtual('id').get(function() {
  return this._id.toHexString()
})

orderSchema.set('toJSON', {
  virtuals: true
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order