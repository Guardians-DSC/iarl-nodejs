const express = require('express')
const consign = require('consign')

const app = express()

// load startup modules
require('./startup/logger')(app)
require('./startup/parser')(app)
require('./startup/cors')(app)
require('./startup/production')(app)

// auto-load modules
consign({verbose: false})
  .include('controllers')
  .then('middlewares')
  .then('routes')
  .into(app);

// handle errors
require('./startup/error')(app)

// handle unexpected errors
process.on('uncaughtException', function(err) {
	console.log(err)
})

// server listen on defined port
var port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`server listen on port ${port}...`) })
