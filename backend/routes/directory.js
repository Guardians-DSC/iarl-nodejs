module.exports = function (app) {
  var directoryControl = app.controllers.directory

  app.route('/api/directory-list').get(directoryControl.list)
}
