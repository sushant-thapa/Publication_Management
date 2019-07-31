var mysql = require('mysql');
var connection = mysql.createConnection(
{
	user:'user',
	password:'password',
	host:'localhost',
	database:'SeProject'
})
// SQL commands
var insertToAuthor="INSERT INTO author (author_email,first_name,last_name) VALUES ?"
var insertToPublication =`INSERT INTO publication(user_email,title,year,publisher,impact_factor,city,doi,ranked,rank,type_of_publication) VALUES ?`;
var insertToContribution = "INSERT INTO contribution (publication_id,author_id) values ?" // mysql code to add in contribution table

// for a specific example, let us consider inserting into report only

var valueInContribution=[];
// the following are sample values. values to be entered in database should be sent as an array of objects

// let us consider that the values are entered for report 
var arrayFromWebsite = [{
	user_email:'thapa.sushant.ts@gmail.com',
	title:'New Beter',
	year:1996,
	publisher:'Harper Collins',
	impact_factor:2,
	city:'kathmandu',
	doi:'this_is_doi',
	ranked:true,
	rank:'one',
	type_of_publication:'article'
	 },

	 {
	editor:'Iconics',
	volume:1,
	periodical_title:'jpt',
	month:'November',
	day:'tuesday',
	pages:55,
	issue:"first",
	issn:'12312'
	},
	[
		{first_name:"Hogan",last_name:"John",author_email:"johnCena@gmadil.com"},
		
		
	]
	]

var authorArray = arrayFromWebsite[2];

var arrayToInsert = [];


connection.query("select author_email from author",function(err,result){
	if(err) throw err;

for (var i in authorArray)
{
	var isAlreadyPresentInTable = false; // if flag is true, the author is already in the table
 	for (var j in result)
 	{

 		if(result[j].author_email==authorArray[i].author_email)
 		{
 			isAlreadyPresentInTable = true;
 			break;
 		}

 	}

 	if(!isAlreadyPresentInTable)
 	{
 		arrayToInsert.push(authorArray[i])
 	}
 	isAlreadyPresentInTable=false;
}
console.log(arrayToInsert);
})
