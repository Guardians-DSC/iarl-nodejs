const jwt = require('jsonwebtoken')
const config = require('config')


function sendToken(req) {
  const token = jwt.sign({ username: req.body.username }, config.get('jwtPrivateKey'), { expiresIn: 60 * 20 })
  return token
}

module.exports = sendToken
