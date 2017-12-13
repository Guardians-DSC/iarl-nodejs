module.exports = function(app) {
    var directories = app.controllers.directories;

    app.route('/api/directories').get(directories.get);
}   