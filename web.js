var express = require('express');

var app = express.createServer(express.logger());

var fs = require('fs')

var mydata = ""

var filedata = fs.readFile('index.html', mydata);

app.get('/', function(request, response) {
  response.send(mydata);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
