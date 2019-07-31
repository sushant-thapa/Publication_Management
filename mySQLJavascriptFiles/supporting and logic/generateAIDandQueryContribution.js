// this file generates the author_id ( named as AID )

var mysql = require('mysql');

var connection = mysql.createConnection({
	host:'localhost',
	user:'user',
	password:'password',
	database:'SeProject'
})
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
		{author_email:"HoganIsthebest@gmail.com",first_name:"Hogan",last_name:"John"},
		{author_email:"thapa.sushant.ts@gmail.com",first_name:"Sushant",last_name:"Thapa"}
	]
	]


var PID = 1;//
var AuthorIdToBeQueried=[];

	arrayOfAuthorEmailsToBeQueried =[]; 

	for(var i =0;i<arrayFromWebsite[2].length;i++)
	{

		arrayOfAuthorEmailsToBeQueried.push(arrayFromWebsite[2][i].author_email);
	}


	for(var i = 0;i<arrayOfAuthorEmailsToBeQueried.length;i++)
	{
		generateAuthorIdAndQuery(`select author_id from author where author_email = '${arrayOfAuthorEmailsToBeQueried[i]}'`,arrayOfAuthorEmailsToBeQueried.length,i)
	}




	 function generateAuthorIdAndQuery(query,length,counter)
	 {

	 	connection.query(query,function(err,result){
	 		if(err) throw err;
	 		AuthorIdToBeQueried.push(result[0].author_id)
	 		if (counter==length-1)
	 		{
	 			addInContributionTable(AuthorIdToBeQueried);
	 		}

	 	})
	 }

	 function addInContributionTable(aidArray){

	 	for (let i=0;i<aidArray.length;i++)
	 	{
	 		generalQuery(`INSERT INTO contribution(author_id,publication_id) values (${aidArray[i]},${PID})`);

	 	}

	 }

	function generalQuery(suppliedQuery){
		connection.query(suppliedQuery,function(err,result){
			if (err) throw err;
			console.log("query is done");
		})
	}