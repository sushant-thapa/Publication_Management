var mysql = require('mysql')
var connection = mysql.createConnection({
	user:'user',
	password:'password',
	host:'localhost',
	database:'SeProject'
})

// author details are extracted from authorID

 var author_id = 1// authorID 


connection.query(`SELECT * from author where author_id=${author_id}`, function(err,result){
		if(err) throw err;
		console.log(result[0]);
})