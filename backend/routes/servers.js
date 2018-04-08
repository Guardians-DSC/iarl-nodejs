module.exports = function (app) {
  var servers = app.controllers.servers

  app.route('/api/servers').get(servers.get)
}
