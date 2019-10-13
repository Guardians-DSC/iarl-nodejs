const jwt = require('jsonwebtoken');
const config = require('config');

function sendToken (req) {
  // Token time limit: 16 hours 
  const token = jwt.sign({ username: req.body.username }, config.get('jwtPrivateKey'), { expiresIn: '16h' });
  return token;
}

module.exports = sendToken;
