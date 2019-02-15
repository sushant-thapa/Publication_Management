var mysql = require('mysql');

var connection = mysql.createConnection({
	user:'username',
	password:'password',
	host:'localhost',
	database:'SeProject'
})
// the following is a sample of the data that we receive from the website
var objectFromWebsite= {
	user_email:'Mosby@gmail.com',
	title:'Best in the world',
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
	doi:'this_is_doi',
	authors:[{first_name:"Ross",last_name:"Geller",email:"rossGeller@yahoo.com"},
			{first_name:"Ted",last_name:"Mosby",email:"tedMosby12@gmail.com"}]
	 };

var publicationIdToBeDeleted;

// should retrieve the publication Id that needs to be deleted
connection.query(`SELECT publication_id FROM publication where title="${objectFromWebsite.title}"`,function(err,result,fields){
	if(err) throw err;
	console.log(result)
	publicationIdToBeDeleted=result[0].publication_id;
	console.log("id to be deleted has been retrieved and it is ");
	console.log(publicationIdToBeDeleted)
	connection.query(`DELETE FROM contribution where publication_id=${publicationIdToBeDeleted}`,function(err,result){
		console.log("the entry has been deleted from the contribution table")
	})
	connection.query(`DELETE FROM publication where publication_id=${publicationIdToBeDeleted}`,function(err,result){
		console.log("the entry has been deleted from publication as well")
	})
	
	
})  