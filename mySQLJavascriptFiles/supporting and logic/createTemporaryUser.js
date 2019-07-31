var mysql =require('mysql');

var connection = mysql.createConnection({
	host:'localhost',
	user:'user',
	password:'password',
	database:'SeProject'
})

connection.connect(function(err){
	if(err) throw err;
	console.log("connected");
	connection.query("insert into user (user_email,first_name,last_name,department) values('thapa.sushant.ts@gmail.com','sushant','thapa','BCT')",function(err,res)
	{
		console.log("user is added");
		process.exit(0);
	})
})