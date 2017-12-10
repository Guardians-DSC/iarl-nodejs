module.exports = function(app) {
    var index = app.controllers.index;

    app.route('/api/workspace').get(index.get);
}