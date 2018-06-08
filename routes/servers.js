module.exports = function (app) {
  const servers = app.controllers.servers
  app.get('/api/servers', servers.get)
}
