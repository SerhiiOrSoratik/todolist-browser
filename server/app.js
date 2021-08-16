const express = require('express');
const app = express();
const router = require('./routes')

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
}

    app.use(allowCrossDomain);
    //some other code
app.use(express.json());
app.use(router)

module.exports = app;