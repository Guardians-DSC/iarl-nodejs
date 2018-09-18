const fs = require('fs')
const path = require('path')
const config = require('config')

function _get (req, res, next) {
  const relativePath = req.query.path || ""
  const absolutePath = path.resolve(config.get('baseDir'), req.user.username, relativePath)

  const regex = new RegExp('^\/home\/' + req.user.username)
  if (!absolutePath.match(regex)) {
    const err = new Error('Unauthorized access')
    err.status = 403
    next(err);
  }

  fs.readdir(absolutePath, (err, list) => {
    if (err) { 
      err.status = 404
      return next(err)
    }

    list.forEach((item, i) => {
      _getItemProperties({ path: absolutePath, item: item }, result => list[i] = result)
    })

    res.send({ path: relativePath, items: list })
  })
}

function _getItemProperties (local, callback) {
  const itemPath = local.path + '/' + local.item
  let itemProperties = { name: local.item, isFile: fs.statSync(itemPath).isFile() }

  if (itemProperties.isFile) {
    itemProperties.extension = path.extname(local.item)
  }

  callback(itemProperties)
}

module.exports = {
  get: _get
}
