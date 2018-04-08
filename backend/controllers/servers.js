module.exports = function (app) {
  var indexControl = {
    get: function (req, res) {
            // load servers
      var servers = require('../servers.json')

      res.status(200).json({
        servers: servers
      })
    }
  }

  return indexControl
}
