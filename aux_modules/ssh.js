const client = require('ssh2').Client;

module.exports = function(connectionSettings, userInputPath, callback) {

    var connection = new client();
    var path = ['/home', connectionSettings.username];
    var path = path.concat(userInputPath).join('/');      

    connection.on('ready', function () {
        connection.sftp(function (err, sftp) {
            if (err) throw err;
            sftp.readdir(path, function (err, list) {
                if (err) throw err;
                // Do not forget to close the connectionection, otherwise you'll get troubles
                connection.end();
                callback(list);
            });
        });
    }).connect(connectionSettings);
}