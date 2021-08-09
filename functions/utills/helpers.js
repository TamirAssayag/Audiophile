const bcrypt = require('bcryptjs')

module.exports = {
  createResponse: (data, success) => {
    return {
      body: JSON.stringify({ data }),
      statusCode: success ? 200 : 500,
    }
  },
  bcryptPassword: (pass) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(12, 'b', (genErr, salt) => {
        if (genErr) reject()
        bcrypt.hash(pass, salt, (hashErr, hash) => {
          if (hashErr) reject()
          resolve(hash)
        })
      })
    })
  },
  getUserId: (event) => {
    return new Promise((resolve, reject) => {
      const { authorization } = event.headers
      if (authorization) {
        resolve(authorization)
      } else {
        reject('Could not find user')
      }
    })
  },
}
