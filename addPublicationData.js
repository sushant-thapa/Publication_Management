var mysql = require('mysql');
var a = 'banditman';
// the following are sample values. values to be entered in database should be sent as an array of objects
var ArrayOfInputObjects = [{
	user_email:'Paul@gmail.com',
	title:'rolling with the stones',
	date:'2020-12-12',
	isbn:12212,
	impact_factor:2,
	type_of_article:'academic',
	volume:'first',
	name_of_journal:'Zerone',
	page_number:'12-23',
	location_of_conference:'Zimbawe',
	article_link:'google.com',
	academic_level:'Amateur',
	doi:'this_is_doi' },
	{
	user_email:'Ringo@gmail.com',
	title:'rolling with the stones',
	date:'2020-12-12',
	isbn:12212,
	impact_factor:2,
	type_of_article:'academic',
	volume:'first',
	name_of_journal:'Zerone',
	page_number:'12-23',
	location_of_conference:'Zimbawe',
	article_link:'google.com',
	academic_level:'Amateur',
	doi:'this_is_doi' },
	{
	user_email:'Daemon@gmail.com',
	title:'rolling with the stones',
	date:'2020-12-12',
	isbn:12212,
	impact_factor:2,
	type_of_article:'academic',
	volume:'first',
	name_of_journal:'Zerone',
	page_number:'12-23',
	location_of_conference:'Zimbawe',
	article_link:'google.com',
	academic_level:'Amateur',
	doi:'this_is_doi' },
]; 
var values = ArrayOfInputObjects.map(convertToArray)


//values is the main array that contains other arrays which holds the values to be entered in the database.


var insertingInstruction =`INSERT INTO publication(user_email,title,date,isbn,impact_factor,type_of_article,volume,name_of_journal,page_number,location_of_conference,article_link,academic_level,doi) VALUES ?`;
	


var connection = mysql.createConnection({
	host:'localhost',
	user:'username',
	password:'password',
	database:'SeProject'
})

connection.connect(function(err)
{
	if(err) throw err;
	console.log("connected");
	connection.query(insertingInstruction,[values],function(err,result){
		if (err) throw err;
		console.log("the query should be used");
	})
}

	)

function convertToArray(suppliedObject)
{
	result =[]
	for(var key in suppliedObject)
	{
		result.push(suppliedObject[key])
	}
	return result;
}