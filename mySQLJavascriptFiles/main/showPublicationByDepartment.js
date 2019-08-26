var mysql = require('mysql')
var connection = mysql.createConnection({
	user:'user',
	password:'password',
	host:'localhost',
	database:'SeProject'
})

// the following file gives us all the publication from a specific type_of_publication and department
var objectFromWebsite= {
type_of_publication:"article",
department:"BCT"
}

var publicationJoinUser=`SELECT publication_id,user_email,title,year,publisher,impact_factor,city,doi,ranked,rank,type_of_publication from user JOIN publication using(user_email) where department='${objectFromWebsite.department}'`;
connection.query(`SELECT * FROM author JOIN 
		(SELECT * FROM contribution JOIN 
		(SELECT * from ${objectFromWebsite.type_of_publication} JOIN (${publicationJoinUser}) as first using(publication_id))
		 as second USING (publication_id)) 
		 AS Third USING (author_id) ORDER BY year`,


	function(err,result){
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
	
		//replaces the duplicate titles
		var FilteredArrayOfFinalObjects =[];
	    FilteredArrayOfFinalObjects.push(arrayOfFinalObjects[0])
	    // console.log(FilteredArrayOfFinalObjects)

	loopi: for (i in arrayOfFinalObjects)
		{
		loopj: for (j in FilteredArrayOfFinalObjects)
			{

				if(FilteredArrayOfFinalObjects[j].publicationInformation.title==arrayOfFinalObjects[i].publicationInformation.title)
				{
					continue loopi;

				}
				
			}
				FilteredArrayOfFinalObjects.push(arrayOfFinalObjects[i])

		}
		// the array FilteredArrayOfFinalObjects contains non repeated publications, filtered by title
		console.log(FilteredArrayOfFinalObjects)

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