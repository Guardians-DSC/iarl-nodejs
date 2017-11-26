module.exports = function(app) {
  
    var index = app.control.index;
    app.route('/').get(index.index);
    app.route('/exit').get(index.logout);

    var login = app.control.login;
    app.route('/login')
    .get(login.index)
    .post(login.post);
}