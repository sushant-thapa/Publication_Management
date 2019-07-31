var mysql = require('mysql')
var connection = mysql.createConnection({
	user:'user',
	password:'password',
	host:'localhost',
	database:'SeProject'
})


// individual types of publication(report/proceeding/article/book/chapter etc is requsted)

 var title ="Neon Lights" // author of given title


connection.query(`SELECT * FROM publication JOIN contribution on publication.publication_id=contribution.publication_id where publication.title="${title}"`,
		function(err,result){
		if(err) throw err;
		var authorIdArray = [];
		for(var i=0;i<result.length;i++)
		{
			authorIdArray.push(result[i].author_id)
		}
		console.log(authorIdArray)
})