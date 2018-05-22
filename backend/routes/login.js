module.exports = function (app) {
  var login = app.controllers.login

  app.route('/api/login').post(login.login)
}
