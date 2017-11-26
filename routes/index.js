module.exports = function(app) {
  
  var index = app.control.index;
  app.route('/').get(index.index);
}