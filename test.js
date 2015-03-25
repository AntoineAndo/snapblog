var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

app.use(session({secret: 'todotopsecret'}))

.use(express.static(__dirname + '/public')) 	

.get('/', function(req, res) { 
    res.render('todo.ejs', {todolist: req.session.todolist});
})

.post('/', function(req, res) {
    res.send('Username: ' + req.body.username);
})

.listen(8080);

