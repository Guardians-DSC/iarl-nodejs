const logger = require('morgan')

module.exports = function (app) {
    // generate logs of requests
    app.use(logger('dev'))    
}
