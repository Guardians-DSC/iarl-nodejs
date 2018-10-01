const fs = require('fs');
const config = require('config');
const path = require('path');
const archiveCreator = require('../utils/archive-creator');

async function _get (req, res, next) {
  const userPath = req.query.path;
  const root = path.join(config.get('baseDir'), req.user.username);

  if (!userPath) {
    const err = new Error('Invalid request');
    err.status = 422;
    return next(err);
  }

  if (Array.isArray(userPath) || _isDirectory(path.resolve(root, userPath))) {
    res.set('Content-Type', 'application/zip');
    res.set('Content-Disposition', 'attachment;filename=download.zip');
    try {
      const archive = await archiveCreator();
      archive.pipe(res);
      _populateZip(userPath, root, archive);
      archive.finalize();
    } catch (err) {
      next(err);
    }
  } else {
    res.download(path.resolve(root, userPath));
  }
}

function _populateZip (userPath, root, archive) {
  if (!Array.isArray(userPath)) {
    userPath = [userPath];
  }
  userPath.forEach(item => {
    const absolutePath = path.resolve(root, item);
    if (_isDirectory(absolutePath)) {
      archive.directory(absolutePath, item);
    } else {
      archive.append(fs.createReadStream(absolutePath));
    }
  });
}

function _isDirectory (path) {
  return fs.statSync(path).isDirectory();
}

module.exports = {
  get: _get
};
