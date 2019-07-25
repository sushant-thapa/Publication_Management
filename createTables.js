var mysql = require('mysql'); // anallgous to #include in c/c++;
var connection  = mysql.createConnection(
{
	host:'localhost',
	user:'user',
	password:'password',
	database:'SeProject',
});

// following are the list of sql commands for various table creation properties;
var commandCreateUserTable ="CREATE TABLE user(user_email VARCHAR(50),first_name TEXT, last_name TEXT,department TEXT,PRIMARY KEY(user_email))"
var commandCreateAuthorTable="CREATE TABLE author(author_email VARCHAR(50),author_id INT AUTO_INCREMENT,first_name TEXT,last_name TEXT,PRIMARY KEY(author_id))"; 
var commandCreateContributionTable = "CREATE TABLE contribution(publication_id INT, author_id INT, FOREIGN KEY(author_id) REFERENCES author(author_id),FOREIGN KEY(publication_id) references publication(publication_id))"
// now for the actual entries

// publication acts as the base class from which the others are derived
var commandCreatePublicationTable= "CREATE TABLE publication (publication_id INT AUTO_INCREMENT PRIMARY KEY,user_email VARCHAR(50), title TEXT, year INT, publisher TEXT,impact_factor FLOAT,city TEXT,doi TEXT,ranked BOOLEAN,rank TEXT,type_of_publication TEXT,FOREIGN KEY(user_email) REFERENCES user(user_email))";

var commandCreateReportTable = "CREATE TABLE report (publication_id INT,department TEXT,institute TEXT, report_type TEXT, pages INT, ISSN TEXT, FOREIGN KEY (publication_id) REFERENCES publication(publication_id))"
var commandCreateProceedingTable ="CREATE TABLE proceeding (publication_id INT,country TEXT, editor TEXT,conference_publication_name TEXT, month TEXT, page_number TEXT,FOREIGN KEY (publication_id) REFERENCES publication(publication_id))"
var commandCreateJournalTable = "CREATE TABLE journal (publication_id INT,editor TEXT, volume FLOAT, journal_name TEXT,page_number TEXT, month TEXT, day TEXT,issue TEXT, ISSN TEXT, FOREIGN KEY (publication_id) REFERENCES publication(publication_id))"
var commandCreateArticleTable = "CREATE TABLE article(publication_id INT,editor TEXT,volume FLOAT,periodical_title TEXT,month TEXT, day TEXT,pages INT,issue TEXT,ISSN TEXT, FOREIGN KEY (publication_id) REFERENCES publication(publication_id))"
var commandCreateBookTable = "CREATE TABLE book(publication_id INT,country TEXT,editor TEXT,volume INT,edition INT,ISBN TEXT,Page_number TEXT,Chapter_number INT,Book_author TEXT, FOREIGN KEY (publication_id) REFERENCES publication(publication_id))"
// following is an array of all the SQL commands
var tableCommands = [commandCreateUserTable,
commandCreateAuthorTable,
commandCreatePublicationTable,
commandCreateContributionTable,

commandCreateReportTable,
commandCreateProceedingTable,
commandCreateJournalTable,
commandCreateArticleTable,
commandCreateBookTable]

//checking the connection with the database

connection.connect(function(err)
{
	console.log("connected to the database");
	
	for(var i=0;i<tableCommands.length;i++)
	{
		myQuery(i);
	}
})

function myQuery(index){
connection.query(tableCommands[index],function(err,result)
		{
			if (err) 
				{
					throw err;
					process.exit(1);
				}
			console.log("table no "+index+" has been created");
			if(index == tableCommands.length-1)
				{process.exit(0)}
		})
}
