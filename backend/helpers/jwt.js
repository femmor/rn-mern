const expressJwt = require('express-jwt')
// DotENV
require('dotenv/config')

function authJwt(){
  const secret = process.env.secret
  return expressJwt({
    secret,
    algorithms: ['HS256']
  })
}

module.exports = authJwt