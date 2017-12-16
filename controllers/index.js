module.exports = function(app) {

    var indexControl = {
        get: function(req, res) {
            if (!req.session.user) {
                res.status(500).json({message: "User isn't logged in!"})
            } else {
                res.status(200).json({
                    title: "Workspace",
                });
            }
        }
    }
 
return indexControl;
}
