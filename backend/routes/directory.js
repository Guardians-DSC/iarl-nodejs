module.exports = function (app) {
  var auth = app.middlewares.auth
  var directoryControl = app.controllers.directory

  app.get('/api/directory-list', auth, directoryControl.list)
}