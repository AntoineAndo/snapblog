var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'snapblog'
});

connection.connect();

connection.query('SELECT * from article', function(err, rows, fields) {
  if (!err)
    console.log('Connection r�ussie', rows);
  else
    console.log('Probl�me');
});

connection.end();