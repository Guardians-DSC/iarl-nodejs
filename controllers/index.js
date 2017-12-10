module.exports = function(app) {

    var indexControl = {
        get: function(req, res) {
            // user isn't logged in? go to login page!
            if (!req.session.user) {
                res.redirect('/login');
                console.log('Redirected to /login');
            }
        },
        index: function(req, res){
            // render the page
            res.sendfile('views/index.html');
        }
    }
 
return indexControl;
}
