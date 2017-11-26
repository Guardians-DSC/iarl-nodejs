const client = require('ssh2').Client;

module.exports = function(connectionSettings, callback) {

    var connection = new client();
    var remotePathToList = '/home/' + connectionSettings.username;

    connection.on('ready', function () {
        connection.sftp(function (err, sftp) {
            if (err) throw err;
            sftp.readdir(remotePathToList, function (err, list) {
                if (err) throw err;
                // Do not forget to close the connectionection, otherwise you'll get troubles
                connection.end();
                callback(list);
            });
        });
    }).connect(connectionSettings);
}