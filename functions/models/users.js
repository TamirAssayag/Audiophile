const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: { type: String, select: false },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'orders' }],
})

module.exports = mongoose.model('User', userSchema)
