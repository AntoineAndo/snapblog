
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'snapblog'
});

var insertPost = function (title,content,checkDate,expDate,expCountdown,callback){  
		var date = new Date();
		console.log(date);

	if(checkDate == 'date')
	{
		var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
		expDate = new Date(expDate.replace(pattern,'$3-$1-$2'));
		expDate.setHours(0);
		expDate.setMinutes(0);
		expDate.setSeconds(0);
	}
	else if (checkDate == 'duration')
	{
		date.setHours(parseInt(date.getHours())+parseInt(expCountdown));
    	expDate = date;
	}


//var test = makeid();

	expDate = expDate.getFullYear() + "-" + (expDate.getMonth()+1) + "-" + expDate.getDate()+ " " +expDate.getHours() + ":" + expDate.getMinutes() + ":" + expDate.getSeconds();

	console.log(title, content, checkDate, expDate, expCountdown);

	query = connection.query('INSERT INTO articles (title, content, expirationDate) VALUES ("'+title+'","'+content+'","'+expDate+'")', function res(err) {

		if(err)
		{
    		callback(err);
    	}
    	else
    	{
    		callback("it works");
    	}
  });
  
};

exports.insertPost = insertPost;
