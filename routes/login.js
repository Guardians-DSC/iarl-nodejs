module.exports = function(app) {

    var login = app.control.login;
    app.route('/login')
    .get(login.index)
    .post(login.post);

}