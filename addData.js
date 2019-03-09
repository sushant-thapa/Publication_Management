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
var addDataInContribution = "INSERT INTO contribution (publication_id,author_email) values ?" // mysql code to add in contribution table
var valueInContribution=[];
// the following are sample values. values to be entered in database should be sent as an array of objects
var arrayOfInputObjects = [{
	user_email:'Mosby@gmail.com',
	title:'New Tester for Sobit',
	date:'2018-12-12',
	isbn:12232,
	impact_factor:2,
	type_of_article:'academic',
	volume:'first',
	name_of_journal:'Zerone-Scholar',
	page_number:'123',
	location_of_conference:'Nambia',
	article_link:'google.com',
	academic_level:'Professional',
	doi:'this_is_doi',
	authors:[{first_name:"Hogan",last_name:"John",author_email:"HoganIsthebest@gmail.com"},
			{first_name:"Sushant",last_name:"Thapa",author_email:"thapa.sushant.ts@gmail.com"}]
	 }]
var arrayFromWebsite=arrayOfInputObjects[0].authors;
var values = arrayOfInputObjects.map(convertToArray);



var publication_id_latest;
	// add data in publication table and extract latest publication_id
connection.query(insertToPublication,[values],function(err,result){
		if (err) throw err;
		console.log("publication query is done");
		connection.query("select max(publication_id) from publication",function(err,result,fields)
{

	 publication_id_latest=(result[0]['max(publication_id)'])
	 console.log("publication_id_latest is extracted")

var arrayToBeAdded =[];
		connection.query("select author_email from author",function(err,result){
			if(err) throw err;
		
			for(let i=0;i<arrayFromWebsite.length;i++){
				var counter=0;
				
				if(result.length==0) 
					{arrayToBeAdded.push(arrayFromWebsite[i])}
				else{
					console.log("hi")
				for(let j=0;j<result.length;j++)	//iterates over the array from the database
				{
					if(arrayFromWebsite[i].author_email==result[j].author_email)
					{
						console.log("the array from website is "+arrayFromWebsite[i].author_email)
						console.log("the checking author in database is "+ result[j].author_email)
						counter++;
					}
					// note	
				}
				if(counter==0)
					arrayToBeAdded.push(arrayFromWebsite[i])
			}
				}
				console.log(arrayToBeAdded)
				var newArray = arrayToBeAdded.map(convertToArray);
				
				if(arrayToBeAdded.length!=0){
					console.log("authors to be added are ")
					console.log(arrayToBeAdded)
			connection.query(commandToAddAuthor,[newArray],function(err,result){
				if(err) throw err;
				console.log("author added successfully")
				
				for(k=0;k<arrayFromWebsite.length;k++)
				{
					valueInContribution[k]=[publication_id_latest,arrayFromWebsite[k].author_email]
				}
				connection.query(addDataInContribution,[valueInContribution],function(err,result){
					if(err) throw err;
					console.log("data added in contribution");
				})
				

				 })
		}
		else
		{

				for(k=0;k<arrayFromWebsite.length;k++)
				{
					valueInContribution[k]=[publication_id_latest,arrayFromWebsite[k].author_email]
				}
				connection.query(addDataInContribution,[valueInContribution],function(err,result){
					if(err) throw err;
					console.log("data added in contribution");
				})
		}

	})

		})	
})

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