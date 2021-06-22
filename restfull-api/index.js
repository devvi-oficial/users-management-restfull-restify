const express = require('express');
const consign = require('consign');
const expressValidator = require('express-validator');



let app = express();
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(express.json({limit: '10mb'}));
app.use(expressValidator());

consign().include('routes').include('utils').into(app);

app.listen(4000, '127.0.0.1', () => {

});
