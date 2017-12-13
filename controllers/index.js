module.exports = function(app) {

    var indexControl = {
        get: function(req, res) {
            if (!req.session.user) {
                res.status(500).json({message: "User isn't logged in!"})
            } else {
                // load servers
                var servers = require('../public/js/servers.json');
                
                res.status(200).json({
                    title: "Workspace",
                    servers: servers,
                });
            }
        }
    }
 
return indexControl;
}
