const fs = require('fs');
const path = require('path');
const archiveCreator = require('../utils/archive-creator');

async function _get (req, res, next) {
  if (_isDirectory(req.user.providedPathResolved)) {
    res.set('Content-Type', 'application/zip');
    res.set('Content-Disposition', `attachment;filename=${path.basename(req.user.providedPathResolved)}.zip`);
    try {
      const archive = await archiveCreator();
      archive.pipe(res);
      archive.directory(req.user.providedPathResolved);
      archive.finalize();
    } catch (err) {
      next(err);
    }
  } else {
    res.download(req.user.providedPathResolved);
  }
}

function _isDirectory (path) {
  return fs.statSync(path).isDirectory();
}

module.exports = {
  get: _get
};
