const cors = require('cors')

module.exports = function (app) {
    // request permission for other domains
    app.use(cors());

    // handle OPTIONS requests
    app.options('*', cors())
}
