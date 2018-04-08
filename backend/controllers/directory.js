const fs = require('fs')
const url = require('url')

module.exports = function (app) {
  let directoryControl = {
    list: function (req, res, next) {
      let path = url.parse(req.url, true).query.path

      if (!path) {
        path = '/home/' + req.session.username + '/'
      }

      fs.readdir(path, (err, list) => {
        if (err) return next(err)

        list.forEach((item, i) => {
          list[i] = {
            name: item,
            path: path + '/' + item,
            isFile: fs.statSync(path + '/' + item).isFile()
          }
        })

        res.send({items: list})
      })
    }
  }

  return directoryControl
}
