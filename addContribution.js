var mysql = require('mysql');
// this is where the publication Id is entered
var publication_id = 1; // dummy value


// the following is an array of objects of authors

var arrayOfAuthors = [{author_email:"ChandlerBing@gmail.com",first_name:"Ross",last_name:"Geller"},{author_email:"mosby101@gmail.com",first_name:"Ted",last_name:"Mosby"},{author_email:"todPacker@gmail.com",first_name:"Tod",last_name:"Packer"}]
var arrayToBeQueriedInContribution =[];

// the following code is written to convert arrayOfAuthors and publication_id to a single array

for (let i=0;i<arrayOfAuthors.length;i++)
{
	var tempArray = [publication_id,arrayOfAuthors[i].author_email]
	arrayToBeQueriedInContribution.push(tempArray)
}
console.log(arrayToBeQueriedInContribution);

var addDataInContribution = "INSERT INTO contribution (publication_id,author_email) values ?" // mysql code to add in contribution table
var connection = mysql.createConnection(
{
	user:'username',
	password:'password',
	host:'localhost',
	database:'SeProject',
})

connection.connect(function(err)
{
	if (err) throw err;
	console.log("connected")
connection.query(addDataInContribution,[arrayToBeQueriedInContribution],function(err,result){
	console.log("it is done");
})
})

