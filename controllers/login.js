const Client = require('ssh2-sftp-client')
const sftp = new Client()

module.exports = function (app) {
  var indexControl = {
    login: function (req, res, next) {
      if (!req.body.username || !req.body.password) {
        var err = new Error('Invalid JSON')
        err.status = 422
        return next(err)
      }
      // ----- switch to LDAP validation -----
      var connectionSettings = {
        host: 'chopper.lcc.ufcg.edu.br', // host to connect
        port: 23456, // port
        username: req.body.username, // lcc username
        password: req.body.password // user password
      }

      sftp.connect(connectionSettings)
      .then(function () {
        req.session.username = req.body.username
        res.status(200).json({message: 'Sucessful login'})
      }).catch(next)
    },

    logout: function (req, res) {
      req.session.destroy()
      res.status(200).json({message: 'User logged out'})
    }
  }

  return indexControl
}
