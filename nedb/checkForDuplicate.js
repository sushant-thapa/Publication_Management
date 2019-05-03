	// here the relevant information about whether some title is repeated or not is given by isDuplicate

	var Datastore = require('nedb') // loading nedb module
	var Records = new Datastore({filename:'C:/Users/thapa/nedbPractice/data/totalData.txt',autoload:true}) // creating a DataStore object with relevant file location
	
	var TitleWhoseDuplicationIsTested = "Artifical Intelligence. A Modern Approach";
	var isDuplicate;
	Records.find({},function(err,result){
		
	for (let i =0;i<result.length;i++)
	{
		if(result[i].title===TitleWhoseDuplicationIsTested)
			isDuplicate=true;
	}
	if(isDuplicate!=true)
		isDuplicate=false;
	console.log(isDuplicate)
})
