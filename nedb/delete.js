var DataStore = require('nedb'); // loading the nedb module
var titleOfDelete = "Sobboman" // this givs the title of the file that we want to delete

var Deletion = new DataStore({filename:"C:/Users/thapa/nedbPractice/data/totalData.txt",autoload:true}) // when autoload is true, we do not 
//have to manually perform Deletion.loadDatabase()

Deletion.remove({title:titleOfDelete},function(err,result){
	if(err) throw err;
	console.log(result);
})