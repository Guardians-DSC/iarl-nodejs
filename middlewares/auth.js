const jwt = require('jsonwebtoken');
const path = require('path');
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
    req.user.path = path.join(
      config.get('baseDir'),
      config.get('lccsPaths')[req.headers.lcc],
      req.user.username
    );
    next();
  } catch (ex) {
    const err = new Error('Invalid token');
    err.status = 401;
    return next(err);
  }
};

module.exports = function (app) {
  return auth;
};
