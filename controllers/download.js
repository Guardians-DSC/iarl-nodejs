const url = require('url')

module.exports = function (app) {
  var downloadControl = {
    download: function (req, res, next) {
      let path = url.parse(req.url, true).query.path

      if (!path) {
        var err = new Error('Invalid JSON')
        err.status = 422
        return next(err)
      }

      res.download(path)
    }
  }

  return downloadControl
}
