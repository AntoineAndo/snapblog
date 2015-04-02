var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var reqmysql = require("./DAO/connection");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();
var func = require("./functions");

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

	var idArticle = func.makeid(20);
	
	console.log("ID:" + idArticle);

	reqmysql.insertPost(title,content,checkDate,expDate,expCountdown,idArticle, function callback (result){
		//msg="Votre article a été posté";
		//res.render('index.ejs', {message: msg});

		res.redirect('http://localhost:8080/'+idArticle);

	});
})

.get('/:url', function(req, res) { 

	reqmysql.checkUrl(req.params.url, function callback (result){
		console.log("RESULT: " + result);
		if(!result)
		{
			msg="Cet article n'existe pas";
			res.render('index.ejs', {message: msg});
		}
		else if (result)
		{
			reqmysql.getArticle(result.idArticle, function callback(result){
			var title = result.title;
			var content = result.content;
			msg="Cet article existe";
			res.render('article.ejs', {title: title, content: content});
			});
		}

	})
})

.use(express.static(__dirname + '/public'))

.listen(8080);

