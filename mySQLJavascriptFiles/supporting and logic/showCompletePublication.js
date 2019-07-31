var mysql = require('mysql')
var connection = mysql.createConnection({
	user:'user',
	password:'password',
	host:'localhost',
	database:'SeProject'
})

// individual types of publication(report/proceeding/article/book/chapter etc is requsted)

var type_of_publication = "report" // for example report is requested


connection.query(`SELECT * FROM publication JOIN ${type_of_publication} ON publication.publication_id = ${type_of_publication}.publication_id`,function(err,result){
	if(err) throw err;
	console.log(result) // extract from here
})