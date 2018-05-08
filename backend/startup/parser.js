const bodyParser = require('body-parser')

module.exports = function (app) {
    // converts the request to JSON
    app.use(bodyParser.json({ type: 'text' }))
    app.use(bodyParser.json())
}
