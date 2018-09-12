const fs = require('fs')
const path = require('path')


function _get (req, res, next) {
  const relativePath = req.query.path || ""
  const absolutePath = '/home/' + req.user.username + '/' + relativePath

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
