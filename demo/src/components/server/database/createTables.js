var mysql = require('mysql'); // anallgous to #include in c/c++;

// following are the list of sql commands for various table creation properties;
var commandCreatePublicationTable= "CREATE TABLE publication (publication_id INT AUTO_INCREMENT PRIMARY KEY,user_email VARCHAR(255), title VARCHAR(255), date DATE, isbn INT,impact_factor FLOAT,type_of_article VARCHAR(255),volume VARCHAR(255),name_of_journal VARCHAR(255),page_number VARCHAR(255),location_of_conference VARCHAR(255),article_link VARCHAR(255),academic_level VARCHAR(255),doi VARCHAR(255))";
var commandCreateAuthorTable="CREATE TABLE author(author_email VARCHAR(255) PRIMARY KEY,first_name VARCHAR(255),last_name VARCHAR(255))"; // correct it please
var commandCreateContributionTable = "CREATE TABLE contribution(publication_id INT, author_email VARCHAR(255),FOREIGN KEY (author_email) REFERENCES author(author_email), FOREIGN KEY (publication_id) REFERENCES publication(publication_id))";

//connecting to the SeProject database;
var connection  = mysql.createConnection(
{
	host:'localhost',
	user:'username',
	password:'password',
	database:'SeProject',
});

//checking the connection with the database
connection.connect(function(err){
	console.log("connected to the database");
	connection.query(commandCreatePublicationTable,function(err,result){
	if (err) throw err;
	console.log("table publication has been created")
})
	
	connection.query(commandCreateAuthorTable,function(err,result)
	{
		if (err) throw err;
		console.log("table author has been created");	
	})
	connection.query(commandCreateContributionTable,function(err,result)
	{
		if (err) throw err;
		console.log("table contribution has been created");
	})
})
