const ldapAuth = require('../modules/ldapAuth');
const tokenGenerator = require('../modules/tokenGenerator');


var login = function(req, res, next) {

  // validates json
  if (!req.body.username || !req.body.password) {
    const err = new Error('Invalid JSON')
    err.status = 422
    return next(err)
  }

  // authenticate with LDAP and send token
  ldapAuth(req)
    .then(() => { 
      let token = tokenGenerator(req)
      setTimeout(() => { res.send({token: token}) }, 200)
    })
    .catch((err) => { next(err) })

}

module.exports.login = login
