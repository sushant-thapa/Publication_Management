var mysql = require('mysql');
var connection = mysql.createConnection({
	user:'user',
	password:'password',
	host:'localhost',
	database:'SeProject'
})
var UserFromWebsite = {
user_email:'amanShakya@gmail.com',
first_name:'Aman',
last_name:'Shakya',
department:'Department of Electronics and Computer Engineering',
password:'password'}

connection.connect(function(err){
	if (err) throw err;
	connection.query("INSERT INTO user(user_email,first_name,last_name,department,password) VALUES  ?",[[convertToArray(UserFromWebsite)]],function(err,result){
		if(err) throw err;
		console.log("user added")
	})
})




function convertToArray(suppliedObject) // this function merely converts all the entries of a JS object into an array;
{
	var result =[]
	for(var key in suppliedObject)
	{
		result.push(suppliedObject[key])
	}
	return result;
}
