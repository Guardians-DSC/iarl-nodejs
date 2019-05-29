const config = require('config');
const path = require('path');

module.exports = (req, res, next) => {
  const lcc = config.get('lccsPaths')[req.headers.lcc];
  if (!lcc) {
    const err = new Error('The provided lcc is invalid');
    err.status = 400;
    return next(err);
  }

  const userRootPath = path.join(config.get('baseDir'), lcc, req.user.username);
  const providedPath = req.query.path || '';
  const absolutePath = path.resolve(userRootPath, providedPath);

  const userOriginPathRegex = new RegExp(`${userRootPath}`);
  if (!absolutePath.match(userOriginPathRegex)) {
    const err = new Error('Unauthorized access');
    err.status = 403;
    return next(err);
  }

  req.user.providedPathResolved = absolutePath;
  req.user.providedPath = providedPath;
  next();
};
