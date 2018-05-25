const fs = require('fs')


function _get (req, res, next) {
  let path = req.query.path;

  if (!path) {
    path = ""
    absolutePath = '/home/' + req.user.username + '/'
  } else {
    absolutePath = '/home/' + req.user.username + '/' + path 
  }

  fs.readdir(absolutePath, (err, list) => {
    if (err) { 
      err.status = 404
      return next(err)
    }

    list.forEach((item, i) => {
      list[i] = {
        name: item,
        path: path + '/' + item,
        isFile: fs.statSync(absolutePath + '/' + item).isFile()
      }
    })

    res.send({items: list})
  })
}

module.exports = {
  get: _get
}
