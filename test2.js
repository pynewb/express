var express = require('express');
var app = express();

var port = 3000;

app.use(express.responseTime());
app.use(express.logger());
app.use(express.cookieParser());
app.use(express.session({ secret: 'stupendously undistinguished', key: 'sid'}));
app.use(express.basicAuth(function (user, pass) {
    return user == 'guest' && pass == 'guest';
}));
// N.B. this makes all source files servable
app.use(express.static(__dirname));
app.use(express.query());
app.use(express.bodyParser());
app.use(express.csrf());

app.listen(port);
console.log('Server listening on port ' + port);
