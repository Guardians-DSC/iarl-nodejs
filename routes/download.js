module.exports = function (app) {
    var downloadControl = app.controllers.download
  
    app.route('/api/download').post(downloadControl.download)
  }
  