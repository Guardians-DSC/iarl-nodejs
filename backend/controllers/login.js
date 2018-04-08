const ldap = require('ldapjs')
const ldapConf = require('../config.json')

module.exports = function (app) {
  const loginControl = {
    login: function (req, res, next) {
      if (!req.body.username || !req.body.password) {
        const err = new Error('Invalid JSON')
        err.status = 422
        return next(err)
      }

      function authDN (dn, password, cb) {
        const client = ldap.createClient({url: ldapConf.ldapUrl})

        client.bind(dn, password, function (err) {
          client.unbind()
          cb(err, err === null)
        })
      }

      const dn = 'uid=' + req.body.username + ',' + ldapConf.ldapDN

      authDN(dn, req.body.password, (err, status) => {
        if (err) {
          err.status = 401
          return next(err)
        }

        req.session.username = req.body.username
        res.send({message: 'Successful login'})
      })
    },

    logout: function (req, res) {
      req.session.destroy()
      res.status(200).json({message: 'User logged out'})
    }
  }

  return loginControl
}
