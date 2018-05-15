const express = require('express')
const load = require('express-load')

const app = express()

// load startup modules
require('./startup/logger')(app)
require('./startup/parser')(app)
require('./startup/cors')(app)

// load routes
load('controllers').then('middlewares').then('routes').into(app)

// handle errors
require('./startup/error')(app)

module.exports = app
