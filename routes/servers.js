module.exports = function (app) {
  const servers = app.controllers.servers;

  /**
   * @api {get} /api/servers List servers
   * @apiGroup Servers
   *
   * @apiDescription
   * Lists all servers that the client can connect to have access to user directories.
   *
   * @apiSuccess {String} servers An array with server names, addresses, and ports.
   *
   * @apiSuccessExample {json} Success
   * HTTP/1.1 200 OK
   * {
   *    "servers": [
   *        {
   *            "name": "lcc1",
   *            "host": "chopper.lcc.ufcg.edu.br",
   *            "port": "23456"
   *        },
   *        {
   *            "name": "lcc2",
   *            "host": "r2d2.lcc.ufcg.edu.br",
   *            "port": "23456"
   *        }
   *    ]
   * }
   */
  app.get('/api/servers', servers.get);
};
