const session = require('express-session')
const config = require('config')

module.exports = function(app) {
    // create user session
    app.use(session({secret: config.get('jwtPrivateKey'), resave: false, saveUninitialized: true}))
}
