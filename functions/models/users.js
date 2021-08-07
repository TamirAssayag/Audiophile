const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'orders' }],
})

module.exports = mongoose.model('User', userSchema)
