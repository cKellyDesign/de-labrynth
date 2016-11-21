var http = require('http');
var path = require('path');
var express = require('express');

var app = express();
var options = { root: __dirname + "/"} ;
app.set('port', 8080);
app.set('case sensitive routing', false);

app.get('/', function(req, res) {
    res.sendFile("Index.html", options, function (err) {
        if (err) {
            console.log(err);
            res.send('Error - ', err.status);
        }
    });
});

app.get('/list/:slug', function(req, res) {
    res.sendFile("checklistPage.html", options, function (err) {
        if (err) {
            console.log(err);
            res.send('Error - ', err.status);
        }
    });
});

app.get('/other', function(req, res) {
   res.sendFile("Other.html", options, function (err) {
       if (err) {
           console.log(err);
           res.send('Error - ', err.status);
       }
   });
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