var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'snapblog'
});

connection.connect();

connection.query('SELECT titleArticle from article', function(err, rows, fields) {
  if (!err)
    console.log('Connection réussie', rows);
  else
    console.log('Problème');
});

connection.end();