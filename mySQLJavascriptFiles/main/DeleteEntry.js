var mysql = require('mysql');

var connection = mysql.createConnection({
	user:'user',
	password:'password',
	host:'localhost',
	database:'SeProject'
})
// 
var titleToDelete = {
	user_email:'thapa.sushant.ts@gmail.com',
	title:'Computer bowl',}

	connection.query(`DELETE FROM publication WHERE title="${titleToDelete.title}" AND user_email="${titleToDelete.user_email}"`,function(err,result){
		if(err) throw err;
		console.log("the entry has been deleted");
	})