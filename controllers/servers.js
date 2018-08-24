function _get (req, res) {
  // load servers
  const servers = require('../servers.json')

  res.status(200).json({
    servers: servers
  })  
}

module.exports = {
  get: _get
}
