var mysql = require('mysql');
var connection = mysql.createConnection(
{
	user:'username',
	password:'password',
	host:'localhost',
	database:'SeProject'
})
// SQL commands
var commandToAddAuthor="INSERT INTO author (first_name,last_name,author_email) VALUES ?"
var insertToPublication =`INSERT INTO publication(user_email,title,date,isbn,impact_factor,type_of_article,volume,name_of_journal,page_number,location_of_conference,article_link,academic_level,doi) VALUES ?`;
var addDataInContribution = "INSERT INTO contribution (publication_id_latest,author_email) values ?" // mysql code to add in contribution table

// the following are sample values. values to be entered in database should be sent as an array of objects
var arrayOfInputObjects = [{
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
	 }]
var arrayFromWebsite=arrayOfInputObjects[0].authors;

var values = arrayOfInputObjects.map(convertToArray);



var publication_id_latest;
	
connection.query(insertToPublication,[values],function(err,result){
		if (err) throw err;
		console.log("publication query is done");
		connection.query("select max(publication_id) from publication",function(err,result,fields)
{

	 publication_id_latest=(result[0]['max(publication_id)'])
	 console.log("publication_id_latest is extracted")
})	
	})
	//extracting the latest publication id



// here comes the code to add author
var arrayToBeAdded =[];
		connection.query("select author_email from author",function(err,result){
			if(err) throw err;

			for(let i=0;i<arrayFromWebsite.length;i++){
				var counter=0;
				if(result.length==0) 
					{arrayToBeAdded.push(arrayFromWebsite[i])}
				else{
				for(let j=0;j<result.length;j++)	//iterates over the array from the database
				{
					if(arrayFromWebsite[i].author_email==result[j].author_email)
					{
						counter++;
					}
					
				}
				if(counter==0)
					arrayToBeAdded.push(arrayFromWebsite[i])
			}
				}
				
				var newArray = arrayToBeAdded.map(convertToArray);
				
				if(arrayToBeAdded.length!=0){
			connection.query(commandToAddAuthor,[newArray],function(err,result){
				if(err) throw err;
				console.log("author added successfully")
				// the following array is for contribution table

				var arrayToBeQueriedInContribution =[];
for (let i=0;i<arrayFromWebsite.length;i++)
{
	var tempArray = [publication_id_latest,arrayFromWebsite[i].author_email]
	arrayToBeQueriedInContribution.push(tempArray)
}

		// this is the query in the contribution query

		connection.query(addDataInContribution,[arrayToBeQueriedInContribution],function(err,result){
	console.log("contribution query is over");
})

		
			})
		}
		})

// part of author table is over

//the following is to add to contribution table



//adding in the contribution table


// contribution query over
function convertToArray(suppliedObject)
{
	var result =[]
	for(var key in suppliedObject)
	{
		if(key=='authors') continue;
		result.push(suppliedObject[key])
	}
	return result;
}