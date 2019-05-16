var DataStore = require("nedb"); // loading the module
//var titleFromWebsite = "New Tester for Sobit";
var showOneArticle = (titleFromWebsite, fn) => {
  var record = new DataStore({
    filename: __dirname + "/totalData.txt",
    autoload: true
  }); // make a DataStore object

  record.findOne({ title: titleFromWebsite }, function(err, result) {
    if (err) throw err;
    fn(result);
  });
};

module.exports = {
  showOneArticle: showOneArticle
};
