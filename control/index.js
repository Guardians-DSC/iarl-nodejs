const client = require('ssh2').Client;

module.exports = function(app) {

    var indexControl = {
        index: function(req, res) {
            res.render('index', {list: {}, title: 'IARL'});
        },
        post: function(req, res) {
            var connectionSettings = {
                host: 'chopper.lcc.ufcg.edu.br', // host to connect
                port: 23456, // port
                username: req.body.username, // lcc username
                password: req.body.password // user password
            };
            
            var connection = new client();
            var remotePathToList = '/home/' + connectionSettings.username;
            
            connection.on('ready', function () {
                connection.sftp(function (err, sftp) {
                    if (err) throw err;
            
                    sftp.readdir(remotePathToList, function (err, list) {
                    if (err) throw err;
                    // List the directory in the page
                    res.render('index', {list: list, title: 'IARL'});
                    // Do not forget to close the connectionection, otherwise you'll get troubles
                    connection.end();
                    });
                });
            }).connect(connectionSettings);

        }
    }
 
return indexControl;
}
