module.exports = function(app) {

    var indexControl = {
        get: function(req, res) {
            res.status(200).json({
                title: "Login",
            });
            console.log('In login page');
        },
        post: function(req, res) {
            // LDAP validation
            res.end('LDAP validation here.');
        }
    }
 
return indexControl;
}
