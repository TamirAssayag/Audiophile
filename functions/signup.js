const helpers = require('./utills/helpers')
const db = require('./utills/db')
const User = require('./models/users')

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    db.connectToDatabase()
    const { name, email, password } = JSON.parse(event.body)

    const findUser = await User.find({ email })

    if (findUser.length) {
      return helpers.createResponse(
        { errorMsg: 'Oops! Email is already taken' },
        false
      )
    }

    const user = await User.create({
      name,
      email,
      password: await helpers.bcryptPassword(password),
      orders: [],
    })
    return helpers.createResponse(
      { _id: user._id, name, email, orders: user.orders },
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
