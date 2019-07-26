var mysql = require('mysql')
var connection = mysql.createConnection({
	user:'user',
	password:'password',
	host:'localhost',
	database:'SeProject'
})
// This file gives all the authors of a given type of publication
var type_of_publication = "proceeding";

// author details are extracted from authorID

connection.query(`SELECT * FROM (SELECT * FROM publication AS p
INNER JOIN contribution AS c using(publication_id) INNER JOIN author AS a using(author_id)) AS x where type_of_publication="proceeding"`, function(err,result){
		if(err) throw err;
		console.log(result,result.length);
})



 