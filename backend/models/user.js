const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

// Virtuals
userSchema.virtual('id').get(function() {
  return this._id.toHexString()
})

userSchema.set('toJSON', {
  virtuals: true
})

const User = mongoose.model('User', userSchema)

module.exports = User