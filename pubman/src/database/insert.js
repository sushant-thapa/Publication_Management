import config from './config';
var Datastore = require("nedb"); // loading the module provided by nedb
// this is a sample data from the website
/* var sampleRecord = {
  user_email: "John@gmail.com",
  title: "Sobboman",
  date: "2018-12-12",
  isbn: 12232,
  impact_factor: 2,
  type: "academic",
  volume: "first",
  journal_name: "Zerone-Scholar",
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
  var file = config.save_location+"/totalData.txt";
  var dataRecord = new Datastore({
    filename: file
  }); // opening the file totalData.txt
  console.log(dataRecord);
  dataRecord.loadDatabase(function(err) {
    if (err){
      console.log("ERROR! ", err);
      throw err;
      return;
    };
    dataRecord.insert(sampleRecord, function(
      err,
      res // insert the data into totalData.txt
    ) {
      if (err){
        console.log("ERROR: ", err);
        return false;
      };
      return true;
    });
  });
}

export default addPublication;
