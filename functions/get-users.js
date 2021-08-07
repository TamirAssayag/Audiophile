const helpers = require('./utills/helpers')
const db = require('./utills/db')
const User = require('./models/users')
const Orders = require('./models/orders')

const fetchAllUsers = async () => {
  try {
    await db.connectToDatabase()
    const users = await User.find().populate({ path: 'orders', model: Orders })
    return helpers.createResponse(users, true)
  } catch (err) {
    console.log(err)
    return helpers.createResponse(
      { errorMsg: 'Something went wrong...' },
      false
    )
  }
}

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  return fetchAllUsers()
}
