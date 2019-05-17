const fs = require('fs');
const config = require('config');
const path = require('path');
const archiveCreator = require('../utils/archive-creator');
const lccGetter = require('../utils/lcc-body-getter');

async function _get (req, res, next) {
  const lcc = lccGetter(req)
  const userPath = req.query.path;
  const root = path.join(config.get('baseDir') + lcc, req.user.username);
  const absolutePath = path.resolve(root, userPath);

  if (!userPath) {
    const err = new Error('Invalid request');
    err.status = 422;
    return next(err);
  }

  if (_isDirectory(absolutePath)) {
    res.set('Content-Type', 'application/zip');
    res.set('Content-Disposition', `attachment;filename=${path.basename(userPath)}.zip`);
    try {
      const archive = await archiveCreator();
      archive.pipe(res);
      archive.directory(absolutePath, userPath);
      archive.finalize();
    } catch (err) {
      next(err);
    }
  } else {
    res.download(absolutePath);
  }
}

function _isDirectory (path) {
  return fs.statSync(path).isDirectory();
}

module.exports = {
  get: _get
};
