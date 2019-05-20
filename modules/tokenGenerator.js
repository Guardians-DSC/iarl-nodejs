const jwt = require('jsonwebtoken');
const config = require('config');

function sendToken (req) {
  const token = jwt.sign({ username: req.body.username }, config.get('jwtPrivateKey'), { expiresIn: '7 days' });
  return token;
}

module.exports = sendToken;
