const express = require('express');
const consign = require('consign');
const debug = require('debug')('app:info');

const app = express();

// load startup modules
require('./startup/logger')(app);
require('./startup/parser')(app);
require('./startup/cors')(app);
require('./startup/production')(app);

// routes
consign({ verbose: false })
  .then('routes')
  .into(app);

// handle errors
require('./startup/error')(app);

// handle unexpected errors
process.on('uncaughtException', function (err) {
  debug(err);
});

// server listen on defined port
var port = process.env.PORT || 3000;
app.listen(port, () => { debug(`server listen on port ${port}...`); });
