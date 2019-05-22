const jwt = require('jsonwebtoken');
const config = require('config');

function sendToken (req) {
  const token = jwt.sign({ username: req.body.username }, config.get('jwtPrivateKey'), { expiresIn: 604800 }); // Validade: 7 dias 
  return token;
}

module.exports = sendToken;
