module.exports = function(app) {
  
    var index = app.controllers.index;
    app.route('/').get(index.index);
    app.route('/exit').get(index.logout);

}