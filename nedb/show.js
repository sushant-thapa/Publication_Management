var DataStore = require('nedb');
var desiredType = "academic"; // this variable holds the type of data that we wish to display
var arrayToBeReturned=[];
var showData = new DataStore({filename:"C:/Users/thapa/nedbPractice/data/totalData.txt",autoload:true})

showData.find({type_of_article:desiredType},function(err,result){
	if (err) throw err;
	console.log(result);
	arrayToBeReturned=result;
})
