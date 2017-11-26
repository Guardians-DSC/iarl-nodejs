const client = require('../aux_modules/ssh');

module.exports = function(app) {

    var indexControl = {
        index: function(req, res) {
            res.render('login');
        },
        post: function(req, res) {
            var connectionSettings = {
                host: 'r2d2.lcc.ufcg.edu.br', // host to connect
                port: 23456, // port
                username: req.body.username, // lcc username
                password: req.body.password // user password
            };

            client(connectionSettings, function(list){
                req.session.user = req.body.username;
                req.session.password = req.body.password;
                res.redirect('/');
            });
        }
    }
 
return indexControl;
}
