const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const load = require('express-load')
const session = require('express-session')
const config = require('config')
const cors = require('cors')

const app = express()

// generate logs of requests
app.use(logger('dev'))

// converts the request to JSON
app.use(bodyParser.json({ type: 'text' }))
app.use(bodyParser.json())

// create user session
app.use(session({secret: config.get('jwtPrivateKey'), resave: false, saveUninitialized: true}))

// request permission for other domains
app.use(cors());

// verify if user is logged in
app.use(['/api/servers', '/api/directories'], function (req, res, next) {
  if (!req.session.username) {
    res.status(500).json({message: "User isn't logged in!"})
  }
  next()
})

// sends empty JSON to OPTIONS requests
app.options('*', cors())

// load routes
load('controllers').then('routes').into(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // send the error
  res.status(err.status || 500)
  res.json({message: err.message})
})

module.exports = app
