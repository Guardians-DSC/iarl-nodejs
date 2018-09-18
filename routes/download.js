module.exports = function (app) {
  var auth = app.middlewares.auth
  var downloadControl = app.controllers.download

  app.get('/api/download', auth, downloadControl.get)
}

