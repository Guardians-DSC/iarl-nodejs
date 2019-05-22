const jwt = require('jsonwebtoken');
const config = require('config');

function sendToken (req) {
  // Validade do Token: 7 dias 
  const token = jwt.sign({ username: req.body.username }, config.get('jwtPrivateKey'), { expiresIn: 604800 }); // 604800 = seconds * minutes * hours * days = 60 * 60 * 24 * 7
  return token;
}

module.exports = sendToken;
