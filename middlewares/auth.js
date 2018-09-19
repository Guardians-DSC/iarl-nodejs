const jwt = require('jsonwebtoken');
const config = require('config');

const auth = function (req, res, next) {
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
    err.status = 400;
    return next(err);
  }
};

module.exports = function (app) {
  return auth;
};
