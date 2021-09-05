const bcrypt = require('bcryptjs')
const helpers = require('./utills/helpers')
const db = require('./utills/db')
const User = require('./models/users')
const Orders = require('./models/orders')

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    db.connectToDatabase()
    const { email, password } = JSON.parse(event.body)
    const user = await User.findOne({
      email,
    }).populate('-password', {
      path: 'orders',
      model: Orders,
    })

    if (!user) {
      return helpers.createResponse({ errorMsg: 'User not found.' }, false)
    }
    const result = bcrypt.compareSync(password, user.password)
    if (result) {
      return helpers.createResponse(
        { _id: user._id, email, orders: user?.orders },
        true
      )
    } else {
      return helpers.createResponse({ errorMsg: 'Invalid Password!' }, false)
    }
  } catch (err) {
    console.log(err)
    return helpers.createResponse(
      { errorMsg: 'Something went wrong...' },
      false
    )
  }
}
