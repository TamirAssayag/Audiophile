const helpers = require('./utills/helpers')
const db = require('./utills/db')
const User = require('./models/users')
const mongoose = require('mongoose')

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    await db.connectToDatabase()
    const { email, password } = JSON.parse(event.body)
    const user = await User.create({
      email,
      password: await helpers.bcryptPassword(password),
      orders: [],
    })
    return helpers.createResponse(
      { _id: user._id, email, orders: user.orders },
      true
    )
  } catch (err) {
    console.log(err)
    return helpers.createResponse(
      { errorMsg: 'Something went wrong...' },
      false
    )
  }
}
