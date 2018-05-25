module.exports = function (app) {
  var auth = app.middlewares.auth
  var directoriesREST = app.controllers.directories

  app.get('/api/directories', auth, directoriesREST.get)
}
