const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  date: Date,
  cart: [
    {
      productId: String,
      quantity: Number,
    },
  ],
})

module.exports = mongoose.model('Orders', orderSchema)
