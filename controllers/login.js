const Client = require('ssh2-sftp-client');
const sftp = new Client();
module.exports = function(app) {

    var indexControl = {
        post: function(req, res, next) {
            // ----- switch to LDAP validation -----
            var connectionSettings = {
                host: 'chopper.lcc.ufcg.edu.br', // host to connect
                port: 23456, // port
                username: req.body.username, // lcc username
                password: req.body.password // user password
            };

            sftp.connect(connectionSettings)
            .then(() => {
                req.session.user = req.body.username;
                req.session.password = req.body.password;
                req.session.path = [];
                res.status(200).json('Sucessful login')
            }).catch(next);
        }
    }
 
return indexControl;
}
