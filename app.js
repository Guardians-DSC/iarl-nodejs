const express      = require('express'),
      path         = require('path'),
      favicon      = require('serve-favicon'),
      logger       = require('morgan'),
      bodyParser   = require('body-parser'),
      load         = require('express-load');
      session      = require('express-session');

var app = express();

// aplication favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// generate logs of requests
app.use(logger('dev'));

// converts the request to JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// defines the static files directory
app.use(express.static(path.join(__dirname, 'public')));

// create user session
app.use(session({secret:'ss3ncr1ptk3yq1n3d4ni3l9iek', resave:false, saveUninitialized:true}));

// load routes
load('controllers').then('routes').into(app);

// route to handle all angular requests
app.get('*', function(req, res) {
  res.sendfile('./views/index.html'); // load our public/index.html file
});

// catch authentication failed and forward to error handler
app.use(function(err, req, res, next) {
  if (err.message == "All configured authentication methods failed"){
    err.status = 401;
    next(err);
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error
  res.status(err.status || 500);
  res.json({message: err.message});
});

module.exports = app;
