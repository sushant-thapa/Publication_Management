var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	user:'username',
	password:'password'});
connection.connect(function(err)
{
	connection.query("DROP DATABASE SeProject",function(err,result){console.log("database is deleted")})
})
