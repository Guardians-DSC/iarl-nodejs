const client = require('../include/ssh');

module.exports = function(app) {

    var indexControl = {
        index: function(req, res) {
            res.render('login');
        },
        post: function(req, res) {
            var connectionSettings = {
                host: 'chopper.lcc.ufcg.edu.br', // host to connect
                port: 23456, // port
                username: req.body.username, // lcc username
                password: req.body.password // user password
            };

            client(connectionSettings, '', function(list){
                req.session.user = req.body.username;
                req.session.password = req.body.password;
                req.session.path = [];
                res.redirect('/');
            });
        }
    }
 
return indexControl;
}
