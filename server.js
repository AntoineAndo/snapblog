var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var reqmysql = require("./DAO/connection");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();

app.use(session({secret: 'todotopsecret'}))
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())


.get('/', function(req, res) { 
	msg="";
    res.render('index.ejs', {message: msg});
})

.post('/post', function(req, res){
	var title = req.body.titleArticle;
	var content = req.body.content;
	var checkDate = req.body.checkDate;
	var expDate = req.body.expirationDate;
	var expCountdown = req.body.expirationCountdown;

	//var key = func.makeid();

	reqmysql.insertPost(title,content,checkDate,expDate,expCountdown, function callback (result){
		msg="Votre article a été posté";
		console.log('test');
		res.render('index.ejs', {message: msg});

	});
})

.use(express.static(__dirname + '/public'))

.listen(8080);

