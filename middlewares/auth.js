const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    const err = new Error('Access denied. No token provided.');
    err.status = 401;
    return next(err);
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
  } catch (ex) {
    const err = new Error('Invalid token');
    err.status = 401;
    next(err);
  }
};
