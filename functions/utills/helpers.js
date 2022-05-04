const bcrypt = require('bcryptjs')

module.exports = {
  createResponse: (data, success) => {
    return {
      body: JSON.stringify({ data }),
      statusCode: success ? 200 : 500,
      // headers: { 'access-control-allow-origin': '*' },
    }
  },
  bcryptPassword: (pass) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(12, 'b', (genErr, salt) => {
        if (genErr) reject(new Error('Failed'))
        bcrypt.hash(pass, salt, (hashErr, hash) => {
          if (hashErr) reject(new Error('Failed to encrypt password'))
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
        reject(new Error('Could not find user'))
      }
    })
  },
}
