const helpers = require('./utills/helpers')
const db = require('./utills/db')
const User = require('./models/users')
const Orders = require('./models/orders')

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    db.connectToDatabase()

    // Gets user id from client headers
    const { authorization: userId } = event.headers
    if (!userId) {
      return helpers.createResponse({ errorMsg: 'Could not find user' }, false)
    }

    const { cart } = JSON.parse(event.body)
    console.log({ cart })
    // Created new order in "Orders" collection
    const newOrder = await Orders.create({ date: new Date(), cart })
    // Updated user entity in db with the new order he just created
    await User.updateOne({ _id: userId }, { $push: { orders: newOrder._id } })
    console.log({ 0: newOrder.cart })
    // Here we return what we've created
    return helpers.createResponse(newOrder, true)
  } catch (err) {
    return helpers.createResponse({ errorMsg: 'Could not save' }, false)
  }
}
