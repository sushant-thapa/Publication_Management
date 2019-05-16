var Datastore = require("nedb"); // loading nedb module
// creating a DataStore object with relevant file location

//var TitleWhoseDuplicationIsTested = "Artifical Intelligence. A Modern Approach";

var checkForDuplicate = (TitleWhoseDuplicationIsTested, fn) => {
  var Records = new Datastore({
    filename: __dirname + "/totalData.txt",
    autoload: true
  });
  var isDuplicate;
  Records.find({}, function(err, result) {
    for (let i = 0; i < result.length; i++) {
      if (result[i].title === TitleWhoseDuplicationIsTested) isDuplicate = true;
    }
    if (isDuplicate != true) isDuplicate = false;
    //console.log(isDuplicate);
    fn(isDuplicate);
  });
};

module.exports = {
  checkForDuplicate: checkForDuplicate
};
