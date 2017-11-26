const client = require('../aux_modules/ssh');

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

            client(connectionSettings, function(list){
                res.render('index', {list: list, title: 'IARL'});
            });
        }
    }
 
return indexControl;
}
