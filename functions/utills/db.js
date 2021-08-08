const mongoose = require('mongoose')

const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = 'Audiophile'
const DB_URL =
  process.env.DB_URL ||
  `mongodb+srv://cluster0.af2rl.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
module.exports = {
  connectToDatabase: async () => {
    mongoose.connect(DB_URL, {
      user: DB_USERNAME,
      pass: DB_PASSWORD,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    })
  },
}
