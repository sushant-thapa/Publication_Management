var mysql = require('mysql');
var connection = mysql.createConnection(
{
	user:'user',
	password:'password',
	host:'localhost',
	database:'SeProject'
})

var arrayFromWebsite = [{
	user_email:'thapa.sushant.ts@gmail.com',
	title:'New Tester for Sobit',
	year:1996,
	publisher:'Harper Collins',
	impact_factor:2,
	city:'kathmandu',
	doi:'this_is_doi',
	ranked:true,
	rank:'one',
	type_of_publication:'report'
	 },

	 {
	department:'Department of Electronics',
	institute:'Institute of Engineering',
	report_type:'formal',
	pages:25,
	issn:'issn'
	},
	[
		{first_name:"Hogan",last_name:"John",author_email:"HoganIsthebest@gmail.com"},
		{first_name:"Sushant",last_name:"Thapa",author_email:"thapa.sushant.ts@gmail.com"}
	]
	]

var specificTypeOfPublication = arrayFromWebsite[0].type_of_publication;
var specificEntry = arrayFromWebsite[1];
var mainQuery = `INSERT INTO ${specificTypeOfPublication}(publication_id,`;

for (i in specificEntry)
{
	mainQuery+= i + ",";
}
mainQuery=mainQuery.slice(0,-1) // this removes the last character of the query
mainQuery+=") VALUES ?";
