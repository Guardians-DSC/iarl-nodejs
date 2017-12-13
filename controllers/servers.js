const Client = require('ssh2-sftp-client');

module.exports = function(app) {

    var indexControl = {
        get: function(req, res) {
            // load servers
            var servers = require('../public/js/servers.json');
            
            res.status(200).json({
                servers: servers,
            });
        }
    }

return indexControl;
}
