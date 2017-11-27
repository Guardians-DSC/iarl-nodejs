const client = require('../aux_modules/ssh');
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
                        req.session.path.push(query.path);
                    }

                    client(connectionSettings, req.session.path, function(list){
                        res.render('index', {list: list, labs: labs, user: req.session.user});
                    });
                }
                else {
                    res.render('index', {list: {}, labs: labs, user: req.session.user});
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
