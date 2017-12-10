module.exports = function(app) {
    var index = app.controllers.index;

    app.route('/').get(index.get);
    app.route('*').get(index.index);
}