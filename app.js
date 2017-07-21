var express = require('express');
var bodyparser = require('body-parser');
var expressjwt = require('express-jwt');
var cors = require('cors');
var path = require('path');

var app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.use(bodyparser.json());

app.use(cors({credentials: true, origin: function(origin, callback) {
  callback(null, true);
}}));

app.use(expressjwt({ secret: 'secretWord' })
    .unless({
        path: [
            '/auth/login',
            new RegExp('/uploads.*/', 'i'),
        ]
    }));

var connection = require('./connection');
var routes = require('./routes');

connection.start();
routes.config(app);

// Serve statics files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

var server = app.listen(8000, function() {
    console.log('server is runnig in', server.address().port);
});
