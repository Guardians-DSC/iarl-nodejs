const express = require('express')

module.exports = function (app) {
    // populates req.body
    app.use(express.json())
}
