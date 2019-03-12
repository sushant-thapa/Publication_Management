var mysql = require('mysql');
var databaseCreation ="CREATE DATABASE SeProject";

var con = mysql.createConnection(
{
	host:"localhost",
	user:"username",
	password:"password",
	})
con.connect(function(err)
{
	if(err) throw err;
	console.log("connected");
	 // code to create the main database

})

	con.query(databaseCreation,function(err,result){
		if(err) throw err;
		console.log("Database is created");
	})

