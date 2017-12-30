var client = require('ssh2-sftp-client');
var sftp = new client();
module.exports = function(app) {

    var indexControl = {
        login: function(req, res, next) {
            if (req.body.username == "" || req.body.password == ""){
                return next(new Error("Invalid JSON"));
            }
            // ----- switch to LDAP validation -----
            var connectionSettings = {
                host: 'chopper.lcc.ufcg.edu.br', // host to connect
                port: 23456, // port
                username: req.body.username, // lcc username
                password: req.body.password // user password
            };
            
            sftp.connect(connectionSettings)
            .then(function() {
                req.session.user = req.body.username;
                req.session.password = req.body.password;
                req.session.path = [];
                res.status(200).json({message: 'Sucessful login'})
            }).catch(next);
        },

        logout: function(req, res) {
            req.session.destroy();
            res.status(200).json({message: 'User logged out'});
        }
    }
 
return indexControl;
}
