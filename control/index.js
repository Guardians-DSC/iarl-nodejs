const client = require('../aux_modules/ssh');

module.exports = function(app) {

    var indexControl = {
        index: function(req, res) {
            if (!req.session.user) {
                res.redirect('/login');
            }
            else {
                var connectionSettings = {
                    host: 'chopper.lcc.ufcg.edu.br', // host to connect
                    port: 23456, // port
                    username: req.session.user, // lcc username
                    password: req.session.password // user password
                };

                client(connectionSettings, function(list){
                    console.log(list);
                    res.render('index', {list: list, user: req.session.user});
                });
            }
        },
        logout: function(req, res){
            req.session.destroy();
            res.redirect('/login');
        }
    }
 
return indexControl;
}
