var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var reqmysql = require("./DAO/connection");
var passport = require("passport");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();
var func = require("./functions");
var FacebookStrategy = require('passport-facebook').Strategy;
var fbConfig = require('./config/fb.js');

    passport.use('facebook', new FacebookStrategy({
        clientID        : fbConfig.appID,
        clientSecret    : fbConfig.appSecret,
        callbackURL     : fbConfig.callbackUrl
    },
	function(accessToken, refreshToken, profile, done) {
		User.findOne({ oauthID: profile.id }, function(err, user) {
			if(err) { console.log(err); }
			if (!err && user != null) {
			  done(null, user);
			} else {
			  var user = new User({
			    oauthID: profile.id,
			    name: profile.displayName,
			    created: Date.now()
			  });
			  user.save(function(err) {
			    if(err) { 
			      console.log(err); 
			    } else {
			      console.log("saving user ...");
			      done(null, user);
			    };
			  });
			};
		});
	}
));

app.use(session({secret: 'snapblog'}))
.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
.use(passport.initialize())

.get('/', function(req, res) { 
	msg="";
    res.render('index.ejs', {message: msg});
})

.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
})

.get('/test', function(req, res){
	console.log("**************************");
	console.log(req.user.fb.firstName);
	res.render('test', { user: req.user });
})

.get('/auth/facebook', passport.authenticate('facebook', { scope: ['user_friends', 'publish_actions'] }))

.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/test');
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

/*.get('/:url', function(req, res) { 

	reqmysql.checkUrl(req.params.url, function callback (result){
		if(!result)
		{
			color="white";
			msg="Cet article n'existe pas";
			res.render('index.ejs', {message: msg});
		}
		else if (result)
		{
			reqmysql.getArticle(result.idArticle, function callback(result){
				if (result.expirationDate > new Date())
				{
					var title = result.title;
					var content =  result.content;
					console.log('content : ', content);
					res.render('article.ejs', {title: title, content: func.nl2br(content)});
				}
				else
				{
					reqmysql.deleteArticle(result.idArticle);
					color="white";
					console.log(color);
					msg="Cet article a exipré";
					res.render('index.ejs', {message: msg, color: color});
				}
			});
		}

	})
})*/


.use(express.static(__dirname + '/public'))

.listen(8080);

