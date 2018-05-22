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

// server listen on defined port
var port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`server listen on port ${port}...`) })
