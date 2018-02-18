const fs = require('fs')
const AdmZip = require('adm-zip')
const zip = new AdmZip()

module.exports = function (app) {
  var downloadControl = {
    download: function (req, res, next) {
      const path = req.body.path

      if (!path) {
        const err = new Error('Invalid JSON')
        err.status = 422
        return next(err)
      }

      if (path.length > 1 || fs.statSync('/home/' + req.session.username + '/' + path[0]).isDirectory()) {
        path.forEach(element => {
          element = '/home/' + req.session.username + '/' + element
          if (fs.statSync(element).isDirectory()) {
            zip.addLocalFolder(element)
          } else {
            zip.addLocalFile(element)
          }
        })
        res.set('content-type', 'application/zip')
        res.send(zip.toBuffer())
      } else {
        res.download('/home/' + req.session.username + '/' + path)
      }
    }
  }

  return downloadControl
}
