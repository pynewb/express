//
//   Copyright (c) 2013 pynewb
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
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
