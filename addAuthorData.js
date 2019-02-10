var mysql = require('mysql');
var commandToAddAuthor="INSERT INTO author (author_email,first_name,last_name) VALUES ?"
var concon = mysql.createConnection(
{
	host:'localhost',
	user:'username',
	password:'password',
	database:'SeProject',
})
arrayFromWebsite = [{author_email:"ChandlerBing@gmail.com",first_name:"Ross",last_name:"Geller"},{author_email:"mosby101@gmail.com",first_name:"Ted",last_name:"Mosby"},{author_email:"todPacker@gmail.com",first_name:"Tod",last_name:"Packer"}]
arrayToBeAdded = [];
concon.connect(
	function(err){
		if(err) throw err;
		console.log("Database is connected")
		concon.query("select author_email from author",function(err,result){
			if(err) throw err;
			console.log(arrayToBeAdded);

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
				console.log(arrayToBeAdded)
				var newArray = arrayToBeAdded.map(convertToArray);
				
				if(arrayToBeAdded.length!=0){
			concon.query(commandToAddAuthor,[newArray],function(err,result){
				if(err) throw err;
				console.log("added successfully")
			})
		}
		})
	})

function convertToArray(suppliedObject)
{
	result =[]
	for(var key in suppliedObject)
	{
		if(key=='authors') continue;
		result.push(suppliedObject[key])
	}
	return result;
}