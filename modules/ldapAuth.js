const ldap = require('ldapjs')
const config = require('config')


module.exports = function authenticate (req) {
  const dn = `uid=${req.body.username},${config.get('ldap.dn')}`
  const client = ldap.createClient({url: config.get('ldap.url')})

  return new Promise((resolve, reject) => {
    if (process.env.NODE_DEV === 'development') return resolve()

    client.bind(dn, req.body.password, function (err) {
      client.unbind()
      if (err) {
        err.status = 401
        reject(err)
      }
        
      resolve()
    })
  })
}
