var express = require('express');
var app = express();

var port = 3000;

app.use(express.logger());
// N.B. this makes all source files servable
app.use(express.static(__dirname));

app.listen(port);
console.log('Server listening on port ' + port);
