const helpers = require('./utills/helpers')
const db = require('./utills/db')
const User = require('./models/users')
const Orders = require('./models/orders')

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    db.connectToDatabase()
    const userId = await helpers.getUserId(event).catch((err) => {
      return helpers.createResponse(
        { errorMsg: 'Something went wrong...', err },
        false
      )
    })

    const user = await User.findById(userId)
      .populate({
        path: 'orders',
        model: Orders,
      })
      .select('-password')
    return helpers.createResponse(user, true)
  } catch (err) {
    console.log(err)
    return helpers.createResponse(
      { errorMsg: 'Something went wrong...', err },
      false
    )
  }
}
