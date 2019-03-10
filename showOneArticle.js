var mysql = require('mysql');

var connection = mysql.createConnection({
	user:'username',
	password:'password',
	host:'localhost',
	database:'SeProject'
})

var titleToEdit = "Neon Tomorrow";
// should retrieve the publication Id that needs to be deleted
connection.query(`SELECT * FROM publication where title="${titleToEdit}"`,function(err,result,fields){
	if(err) throw err;

	console.log(result);
	
})  