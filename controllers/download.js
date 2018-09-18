const fs = require('fs')
const AdmZip = require('adm-zip')
const zip = new AdmZip()

function _get (req, res, next) {
  const path = req.query.path

  if (!path) {
    const err = new Error('Invalid resquest')
    err.status = 422
    return next(err)
  }

  // excluir essa linha
  req.user = {username: 'daniel'}

  if (Array.isArray(path)) {
    path.forEach(element => {
      element = '/home/' + req.user.username + '/' + element
      if (fs.statSync(element).isDirectory()) {
        zip.addLocalFolder(element)
      } else {
        zip.addLocalFile(element)
      }
    })

    res.set('content-type', 'application/zip')
    res.send(zip.toBuffer())
  } 
  else if (fs.statSync('/home/' + req.user.username + '/' + path).isDirectory()) {
    zip.addLocalFolder('/home/' + req.user.username + '/' + path);

    res.set('content-type', 'application/zip')
    res.send(zip.toBuffer())
  }
  else {
    fs.readFile('/home/' + req.user.username + '/' + path, { encoding: 'utf8' }, function (err, data ) {
      if (err) {
        next(err)
      }

      res.send(data)
    });
  }
}

module.exports = {
  get: _get
}
