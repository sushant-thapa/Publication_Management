var DataStore = require("nedb");
//var desiredType = "academic"; // this variable holds the type of data that we wish to display

function showResearchList(desiredType, f3) {
  // var arrayToBeReturned = [];
  var showData = new DataStore({
    filename: __dirname + "/totalData.txt",
    autoload: true
  });

  showData.find({ type_of_article: desiredType }, function(err, result) {
    if (err) throw err;
    console.log(result);
    f3(result);
    // arrayToBeReturned = result;
  });
}

module.exports = {
  showResearchList: showResearchList
};
