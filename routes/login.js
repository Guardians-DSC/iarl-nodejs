module.exports = function(app) {
    var login = app.controllers.login;
    
    app.route('/login')
    .get(login.get)
    .post(login.post);
}