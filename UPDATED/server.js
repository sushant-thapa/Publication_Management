var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var addData = require("./database/insert.js");
var deleteData = require("./database/delete.js");
var showResearch = require("./database/show.js");
var showOneArticle = require("./database/returnDetailOfTitle.js");
var checkForDuplicate = require("./database/checkForDuplicate.js");

/* var arrayOfInputObjects = {
  user_email: "John@gmail.com",
  title: "Object-Oriented Analysis And Design",
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
};
 */

/* app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
}); */

app.post("/list", (req, res) => {
  var type_of_article = req.body.type_of_article;
  //var type_of_article = "academic";
  showResearch.showResearchList(type_of_article, function(f1) {
    //console.log(f1);
    res.json(f1);
  });
});

app.post("/addNewPublication", (req, res) => {
  var arrayOfInputObjects = req.body;
  checkForDuplicate.checkForDuplicate(arrayOfInputObjects.title, function(f1) {
    if (f1 == false) {
      addData.addPublication(arrayOfInputObjects);
    }
  });
});

app.post("/deletePublication", (req, res) => {
  var title = req.body.title;
  //var title = "Artificial Intelligence";
  deleteData.deletePublication(title);
});

app.post("/showOneArticle", (req, res) => {
  var title = req.body.title;
  showOneArticle.showOneArticle(title, function(f1) {
    res.json(f1);
  });
});

app.listen(3001);
