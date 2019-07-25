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
	title:'Neon Lights',
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
		{author_email:"CMpunk@gmail.com",first_name:"CM",last_name:"Punk"},
		{author_email:"thapa.sushant.ts@gmail.com",first_name:"Sushant",last_name:"Thapa"}
	]
	]

var publicationEntry = 	[convertToArray(arrayFromWebsite[0])];
// this is the variable that contains the data that is common for all kinds of publications
 // the reason we are using array is to make it compatible with the type of query in nodejs mysql
var specificEntry = convertToArray(arrayFromWebsite[1]); 
// here too we are using in array to make it compatible for query later on
// this variable contains the data for specific kinds of publication, eg. report or proceedings

var authors = arrayFromWebsite[2]; // this contains the data of the authors who published

var specificKindOfPublication = arrayFromWebsite[0].type_of_publication; // this contains the string which tells us which specific kind of publication, i.e, report or proceeding.

var latestPublicationId// this variable is the publication_id of the latest data we entered. This is important to enter data into other tables as well

var AuthorIdToBeQueried=[]; // this is the array of author IDs that we need to query. This is useful to enter data in the contribution table
connection.query(insertToPublication,[publicationEntry],function(err,result){ // this queries the data that is first common in all the publications
		if (err) throw err;

		console.log("publication query is done");

		var latestTitle = arrayFromWebsite[0].title;
		connection.query(`SELECT publication_id FROM publication where title = "${latestTitle}"`,function(err,result){ 
			// this queries fetches the publication_id of the latest inserted publication
			if(err) throw err;
			
			var latestPublicationId = result[0].publication_id; // this variable holds the publication id of the latest inserted variable holds
			specificEntry.unshift(latestPublicationId); // appending the latestPublicationId to the specific entry
			specificEntry =[specificEntry];
			var specificQuery=generateSpecificQuery(arrayFromWebsite);
			
			connection.query(specificQuery,[specificEntry],function(err,result){
				if(err) throw err;
				console.log(`information is added in table ${specificKindOfPublication}`);
				// here we check if the author needs to be queried and we enter the information in it and in the bridge table called the contribution
				var authorToBeAdded =[]; // this array contains the data of the authors that are not already in the author table
				
				connection.query("SELECT author_email FROM author",function(err,result){
					if(err) throw err;
					authorToBeAdded= generateAuthorArray(arrayFromWebsite,result) // this is an array of authors that we need to insert, after checking for duplicate
					console.log(authorToBeAdded)
					console.log("checked for duplicate entry")

					for (i in authorToBeAdded){ // converts each element of an array from an object to an array so that we can query
						authorToBeAdded[i]=convertToArray(authorToBeAdded[i]); 
					}
					
					// now we have to add only those authors that have not been added previously
					if(authorToBeAdded.length!=0)
					{
					connection.query("INSERT INTO author(author_email,first_name,last_name) values ?",[authorToBeAdded],function(err,result){
						if(err) throw err;
						console.log("Authors have been added")

						// code for adding in contribution table

						var PID = latestPublicationId;
						var AuthorIdToBeQueried=[];

						var arrayOfAuthorEmailsToBeQueried =[]; 


						for(var i =0;i<arrayFromWebsite[2].length;i++)
						{
							arrayOfAuthorEmailsToBeQueried.push(arrayFromWebsite[2][i].author_email);
						}


						for(var i = 0;i<arrayOfAuthorEmailsToBeQueried.length;i++)
						{
							generateAuthorIdAndQuery(`select author_id from author where author_email = '${arrayOfAuthorEmailsToBeQueried[i]}'`,arrayOfAuthorEmailsToBeQueried.length,i,PID)
						}


					})

					}

					else  // if all the authors are already added. Copy paste code to add in the contribution table
					{
						console.log("it appears the authors in your publication have already been added")
						
						var PID = latestPublicationId;
						var AuthorIdToBeQueried=[];

						var arrayOfAuthorEmailsToBeQueried =[]; 


						for(var i =0;i<arrayFromWebsite[2].length;i++)
						{
							arrayOfAuthorEmailsToBeQueried.push(arrayFromWebsite[2][i].author_email);
						}


						for(var i = 0;i<arrayOfAuthorEmailsToBeQueried.length;i++)
						{
							generateAuthorIdAndQuery(`select author_id from author where author_email = '${arrayOfAuthorEmailsToBeQueried[i]}'`,arrayOfAuthorEmailsToBeQueried.length,i,PID)
						}
					}
					
					 // this is the publication_id of the one we just entered


				})

			})
		})
})




// 			for(let i=0;i<arrayFromWebsite.length;i++){
// 				var counter=0;
				
// 				if(result.length==0) 
// 					{arrayToBeAdded.push(arrayFromWebsite[i])}
// 				else{
// 					console.log("hi")
// 				for(let j=0;j<result.length;j++)	//iterates over the array from the database
// 				{
// 					if(arrayFromWebsite[i].author_email==result[j].author_email)
// 					{
// 						console.log("the array from website is "+arrayFromWebsite[i].author_email)
// 						console.log("the checking author in database is "+ result[j].author_email)
// 						counter++;
// 					}
// 					// note	
// 				}
// 				if(counter==0)
// 					arrayToBeAdded.push(arrayFromWebsite[i])
// 			}
// 				}
// 				console.log(arrayToBeAdded)
// 				var newArray = arrayToBeAdded.map(convertToArray);
				
// 				if(arrayToBeAdded.length!=0){
// 					console.log("authors to be added are ")
// 					console.log(arrayToBeAdded)
// 			connection.query(commandToAddAuthor,[newArray],function(err,result){
// 				if(err) throw err;
// 				console.log("author added successfully")
				
// 				for(k=0;k<arrayFromWebsite.length;k++)
// 				{
// 					valueInContribution[k]=[publication_id_latest,arrayFromWebsite[k].author_email]
// 				}
// 				connection.query(addDataInContribution,[valueInContribution],function(err,result){
// 					if(err) throw err;
// 					console.log("data added in contribution");
// 				})
				

// 				 })
// 		}
// 		else
// 		{

// 				for(k=0;k<arrayFromWebsite.length;k++)
// 				{
// 					valueInContribution[k]=[publication_id_latest,arrayFromWebsite[k].author_email]
// 				}
// 				connection.query(addDataInContribution,[valueInContribution],function(err,result){
// 					if(err) throw err;
// 					console.log("data added in contribution");
// 				})
// 		}

// 	})

// 		})	
// })

// list of helping functions

function generateAuthorIdAndQuery(query,length,counter,PID) // 
	 {

	 	connection.query(query,function(err,result){
	 		if(err) throw err;
	 		AuthorIdToBeQueried.push(result[0].author_id)
	 		if (counter==length-1)
	 		{
	 			addInContributionTable(AuthorIdToBeQueried,PID);
	 		}

	 	})
	 }


	  function addInContributionTable(aidArray,PID){

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

function convertToArray(suppliedObject) // this function merely converts all the entries of a JS object into an array;
{
	var result =[]
	for(var key in suppliedObject)
	{
		result.push(suppliedObject[key])
	}
	return result;
}

function generateSpecificQuery(arrayFromWeb) // this function returns a string, which is a query to the specific type of publication
{

var specificTypeOfPublication = arrayFromWeb[0].type_of_publication;
var specificEntry = arrayFromWeb[1];
var mainQuery = `INSERT INTO ${specificTypeOfPublication}(publication_id,`;

for (i in specificEntry)
{
	mainQuery+= i + ",";
}
mainQuery=mainQuery.slice(0,-1) // this removes the last character of the query
mainQuery+=") VALUES ?";
return mainQuery
}

function generateAuthorArray(arrayFromWeb,result) // this function returns an array of authors which need to be entered inserted into the table
{

	var authorArray = arrayFromWeb[2];
	var arrayToInsert = [];
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

	return (arrayToInsert)
}

