// var http = require('http');
// var port = 18080;
// http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write('<h1>Node.js</h1>');
//     res.end('<p>Hello World</p>');
// }).listen(port);


var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World000!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});