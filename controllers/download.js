const fs = require('fs')
const AdmZip = require('adm-zip')
const config = require('config')
const path = require('path')

function _get (req, res, next) {
  const userPath = req.query.path
  const username = req.user.username

  if (!userPath) {
    const err = new Error('Invalid resquest')
    err.status = 422
    return next(err)
  }

  if (Array.isArray(userPath)) {
    const zip = new AdmZip()
    _populateZip(userPath, username, zip)
    _sendZip(res, zip)
  } 
  else if (_isDirectory(_getAbsolutePath(userPath, username))) {
    const zip = new AdmZip()
    zip.addLocalFolder(_getAbsolutePath(userPath, username));
    _sendZip(res, zip)
  }
  else {
    res.download(_getAbsolutePath(userPath, username)) 
  }
}

function _populateZip(userPath, username, zip) {
  userPath.forEach(item => {
    if (_isDirectory(_getAbsolutePath(item, username))) {
      zip.addLocalFolder(_getAbsolutePath(item, username))
    } else {
      zip.addLocalFile(_getAbsolutePath(item, username))
    }
  })
}

function _sendZip(res, zip) {
  res.set('content-type', 'application/zip')
  res.send(zip.toBuffer())
}

function _isDirectory(path) {
  return fs.statSync(path).isDirectory()
}

function _getAbsolutePath(userPath, username) {
  return path.resolve(config.get('baseDir'), username, userPath)
}

module.exports = {
  get: _get
}
