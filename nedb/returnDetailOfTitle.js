var DataStore = require('nedb'); // loading the module
var titleFromWebsite = "New Tester for Sobit"
var record = new DataStore({filename:'C:/Users/thapa/nedbPractice/data/totalData.txt',autoload:true}) // make a DataStore object

record.findOne({title:titleFromWebsite},function(err,result){
	if (err) throw err;
	console.log(result);
})
