const helpers = require('./utills/helpers')
const db = require('./utills/db')
const User = require('./models/users')
const bcrypt = require('bcryptjs')

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    await db.connectToDatabase()
    const { email, password } = JSON.parse(event.body)
    const user = await User.findOne({
      email,
    })
    if (!user) {
      return helpers.createResponse({ errorMsg: 'User not found.' }, false)
    } else if (!bcrypt.compareSync(password, user.password)) {
      return helpers.createResponse({ errorMsg: 'Invalid Password!' }, false)
    }
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
