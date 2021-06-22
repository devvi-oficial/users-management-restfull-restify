
// let express = require('express');
// let routes = express.Router();

module.exports = app => {

    app.get('/', (req, resp) => {

        resp.statusCode = 200;
        resp.setHeader('Content-Type', 'text/html');
        resp.end('<h1>Rest Full-API</h1>');
    });

};
