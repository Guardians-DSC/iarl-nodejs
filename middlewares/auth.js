const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    const err = new Error('Access denied. No token provided.');
    err.status = 401;
    return next(err);
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res.status(401).send({ error: 'Token error' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token Malformatted' });
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
