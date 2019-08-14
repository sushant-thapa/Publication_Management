var mysql = require('mysql')
var connection = mysql.createConnection({
	user:'user',
	password:'password',
	host:'localhost',
	database:'SeProject'
})


// this file shows how we can extract one file from the given info
var requiredObject = {
user_email:'thapa.sushant.ts@gmail.com',
title:'Yalamber',
type_of_publication:"article"
}




// the following query gives us the result of all the entries of a particular type of publication
connection.query(`SELECT * from ${requiredObject.type_of_publication} JOIN (SELECT * FROM (SELECT * FROM publication AS p INNER JOIN contribution AS c using(publication_id) INNER JOIN author AS a using(author_id) where title="${requiredObject.title}" and user_email="${requiredObject.user_email}") AS x where type_of_publication="${requiredObject.type_of_publication}")as q USING(publication_id)`, function(err,result){
		if(err) throw err;

		var arrayOfPublicationId =[]; // gives the publication IDs of our result
		var arrayOfFinalObjects = []; // this is an array of objects that have all the information. here publication information is not repeated



		// here we are extracting the unique publication IDs from our result because if a publication has two or more authors, the publication is also repeated that many times
		for (var i in result)
		{
				if(arrayOfPublicationId.includes(result[i].publication_id))
			{
				continue;
			}
			else{

				arrayOfPublicationId.push(result[i].publication_id)
			}
		}
	
		// publication ID has been uniquely extracted.

	// 	// in the following code, we append all the author information in a single object
		for (var i in arrayOfPublicationId)
		{

			arrayOfFinalObjects.push({})

			arrayOfFinalObjects[i].authorInformation =[];

			// first we append the publication information in the main object
			for ( var k in result)
				{
					if(arrayOfPublicationId[i]===result[k].publication_id)
					{
						 arrayOfFinalObjects[i].publicationInformation = givePublicationInformation(result[k]) 
						 break;

					}
				}

	// 			// now finalObject[i] has the a non repeating publication information

	// 		// following loop appends author information to the finalObject
			
			for (var j in result)
			{
				if(arrayOfPublicationId[i] == result[j].publication_id)
				{	

					
					var authorInformation = giveAuthorInformation(result[j]) // returns only the publication information;
					arrayOfFinalObjects[i].authorInformation.push(authorInformation)
					
				}	
			}
				
		}
	
		console.log("all the information in one place is ",arrayOfFinalObjects)
	})


function givePublicationInformation(objectFromResult)
{
    var tempObject = JSON.parse(JSON.stringify(objectFromResult)); // here we are making a copy of the tempObject
    
    delete tempObject.author_email
    delete tempObject.first_name;
    delete tempObject.last_name;
    return tempObject;
}

function giveAuthorInformation(objectFromResult)
{
	return ({
		author_email:objectFromResult.author_email,
		first_name:objectFromResult.first_name,
		last_name:objectFromResult.last_name
	})
}