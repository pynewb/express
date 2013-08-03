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
app.use('/css', express.static(__dirname + '/css'));
app.use(express.query());
app.use(express.bodyParser());
app.use(express.csrf());

app.get('/', function (req, res) {
    app.render('index.ejs', {csrf: req.session._csrf}, function (err, html) {
        if (html) {
            res.send(html);
        } else {
            res.send(err);
        }
    });
});

app.post('/', function (req, res) {
    res.send('How about that CSRF!');
});

app.listen(port);
console.log('Server listening on port ' + port);
