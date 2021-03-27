const expressJwt = require('express-jwt')
// DotENV
require('dotenv/config')

// Authentication with ExpressJWT
function authJwt(){
  const secret = process.env.secret
  const api = process.env.API_URL
  return expressJwt({
    secret,
    algorithms: ['HS256']
  }).unless({
    path: [
      // Specify HTTP methods allowed for the public
      // User regular expression insteafd of multiple paths
      {url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS']},
      {url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS']},
      `${api}/users/login`,
      `${api}/users/register`,
    ]
  })
}

module.exports = authJwt