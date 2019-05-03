var Datastore = require("nedb"); // loading the module provided by nedb
// this is a sample data from the website
/* var sampleRecord = {
  user_email: "John@gmail.com",
  title: "Sobboman",
  date: "2018-12-12",
  isbn: 12232,
  impact_factor: 2,
  type_of_article: "academic",
  volume: "first",
  name_of_journal: "Zerone-Scholar",
  page_number: "123",
  location_of_conference: "Nambia",
  article_link: "google.com",
  academic_level: "Professional",
  doi: "this_is_doi",
  authors: [
    {
      first_name: "Hogan",
      last_name: "John",
      author_email: "HoganIsthebest@gmail.com"
    },
    {
      first_name: "Sushant",
      last_name: "Thapa",
      author_email: "thapa.sushant.ts@gmail.com"
    }
  ]
}; */
function addPublication(sampleRecord) {
  var dataRecord = new Datastore({
    filename: __dirname + "/totalData.txt"
  }); // opening the file totalData.txt
  dataRecord.loadDatabase(function(err) {
    if (err) throw err;
    dataRecord.insert(sampleRecord, function(
      err,
      res // insert the data into totalData.txt
    ) {
      if (err) throw err;
      console.log("successful entry");
    });
  });
}

module.exports = {
  addPublication: addPublication
};
