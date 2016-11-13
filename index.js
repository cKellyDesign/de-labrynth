var http = require('http');
var path = require('path');
var express = require('express');

var app = express();

app.set('port', 8080);
app.set('case sensitive routing', false);

app.get('/', function(req, res) {
    res.send('<html><head>'
        + '<script src="/scripts/app.js"></script>'
        + '<link href="/styles/styles.css" rel="stylesheet"/>'
        + '</head><body><h1>Hello World</h1></body></html>');
});


// Set Public Paths
app.use('/scripts', express.static(path.join(__dirname, '/_build/js')));
app.use('/styles', express.static(path.join(__dirname, '/_build/styles')));
app.use('/images', express.static(path.join(__dirname, '/_build/images')));
app.use('/gfx', express.static(path.join(__dirname, '/_build/gfx')));


// Listen to Port
var server = app.listen(process.env.PORT || app.get('port'), function(){
    console.log("Server started on port " + server.address().port);
});