const client = require('../include/ssh');
const url = require('url');

module.exports = function(app) {

    var indexControl = {
        index: function(req, res) {
            if (!req.session.user) {
                res.redirect('/login');
            }
            else {
                var query = url.parse(req.url, true).query;
                var labs = require('../public/js/labs.json');
            
                if (Object.keys(query).length != 0) {
                    if (query.host != undefined && query.port != undefined){
                        req.session.host = query.host;
                        req.session.port = query.port;
                        req.session.path = [];
                    }

                    var connectionSettings = {
                        host: req.session.host, // host to connect
                        port: req.session.port, // port
                        username: req.session.user, // lcc username
                        password: req.session.password // user password
                    };
                    
                    if (query.path == '..'){
                        req.session.path.pop();
                    } else if (query.path != undefined){
                        req.session.path = query.path.split('/');
                    }

                    if (req.session.path.length > 0){
                        req.session.path[req.session.path.length - 1] += '/';
                    }

                    client(connectionSettings, req.session.path, function(list_dir){
                        res.render('index', {list_dir: list_dir, 
                                             labs: labs, 
                                             user: req.session.user, 
                                             inRoot: req.session.path.length,
                                             path: req.session.path.join('/')});
                    });
                }
                else {
                    res.render('index', {list_dir: {}, labs: labs, user: req.session.user, inRoot: 0});
                }
            }
        },
        logout: function(req, res){
            req.session.destroy();
            res.redirect('/login');
        }
    }
 
return indexControl;
}
