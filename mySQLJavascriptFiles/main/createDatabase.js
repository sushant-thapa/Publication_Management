var mysql = require('mysql');
var databaseCreation ="CREATE DATABASE SeProject";
var con = mysql.createConnection(
{
	host:"localhost",
	user:"user",
	password:"password",
	insecureAuth:true,
	})
con.connect(function(err)
{
	if(err) throw err;
	console.log("connected");
	
	// code to create the main database

})

	con.query(databaseCreation,function(err,result){
		if(err){
			throw err;
			process.exit(1)
		}
		console.log("Database is created");
		process.exit(0);

	})

