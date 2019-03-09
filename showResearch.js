// the should return a JSON that shows all the research papers


//the following helps to select the type of article

var type_of_article = "academic";
var mysql = require('mysql');
var connection = mysql.createConnection({
		host:'localhost',
		user:'username',
		password:'password',
		database:'SeProject'
})


var arrayToBeSentToWebsite=[]
var arrayOfAuthorEmails=[];
var arrayOfAuthorNames=[];

	connection.query(`SELECT * FROM publication WHERE type_of_article="${type_of_article}"`,function(err,result,field)
	{

		if(err) throw err;

		for(let i=0;i<result.length;i++)
		{
			let tempObject = {
								publication_id:result[i].publication_id,
								title:result[i].title,
								date:result[i].date,
								doi:result[i].doi,
								isbn:result[i].isbn,
								impact_factor:result[i].impact_factor,
								volume:result[i].volume,
								name_of_journal:result[i].name_of_journal,
								page_number:result[i].page_number,
								location_of_conference:result[i].location_of_conference,
								article_link:result[i].article_link,
								academic_level:result[i].academic_level
								}
			arrayToBeSentToWebsite.push(tempObject)		
		}

		
		//query for authors
		//looping over the publicationIds 
		arrayOfAuthorEmails.pop();
			for(let i=0;i<arrayToBeSentToWebsite.length;i++)
			{
				connection.query(`SELECT author_email FROM contribution WHERE publication_id="${arrayToBeSentToWebsite[i].publication_id}"`,function(err,result,field){
					if(err) throw err;
					arrayOfAuthorEmails.push(result);

					// when i == last index, we have the data we need and must query to find names
						if(i==arrayToBeSentToWebsite.length-1)
						{
							for(let j=0;j<arrayOfAuthorEmails.length;j++) // again iterating over the array of array of emails
							{
								for(let k =0;k<arrayOfAuthorEmails[j].length;k++)
								{
										connection.query(`SELECT first_name,last_name FROM author WHERE author_email="${arrayOfAuthorEmails[j][k].author_email}"`,function(err,result)
										{
											if(err) throw err;
											var tempObject={
																first_name:result[0].first_name,
																last_name:result[0].last_name,
															}
											arrayOfAuthorEmails[j][k]=tempObject;
											if(j==arrayOfAuthorEmails.length-1&&k==arrayOfAuthorEmails[j].length-1)
											{

												console.log(arrayToBeSentToWebsite) // at this point the array is ready to be extracted.
												console.log(arrayOfAuthorEmails)	// at this point the array is ready to be extracted.
													
											}	
											
										})

								}
							}
						}
					})


			
			}

	})
		



