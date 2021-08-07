const mongoose = require('mongoose')

const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = 'Audiophile'
const DB_URL =
  process.env.DB_URL ||
  `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.af2rl.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
module.exports = {
  connectToDatabase: async () => {
    mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  },
}
