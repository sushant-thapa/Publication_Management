var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var addData = require("./database/addData.js");
var deleteData = require("./database/deleteData.js");
var showResearch = require("./database/showResearch.js");

var arrayOfInputObjects = [
  {
    user_email: "Mosby@gmail.com",
    title: "Neon Tomorrow",
    date: "2010-12-12",
    isbn: 12232,
    impact_factor: 2,
    type_of_article: "academic",
    volume: "first",
    name_of_journal: "Zerone",
    page_number: "12-23",
    location_of_conference: "Zimbawe",
    article_link: "google.com",
    academic_level: "Amateur",
    doi: "this_is_doi",
    authors: [
      {
        first_name: "Cena",
        last_name: "John",
        author_email: "johncena@gmail.com"
      },
      {
        first_name: "Sushant",
        last_name: "Thapa",
        author_email: "thapa.sushant.ts@gmail.com"
      }
    ]
  }
];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/list", (req, res) => {
  var type_of_article = req.body.type_of_article;
  var data = showResearch.showResearchList("academic");
  console.log(data);
  res.send(data);
});

app.post("/addNewPublication", (req, res) => {
  // console.log(req.body);
  // var author = req.body.author;
  // var emailId = req.body.emailId;
  // var passWord = req.body.title;
  addData.addPublication(arrayOfInputObjects);
});

app.post("/deletePublication", (req, res) => {
  deleteData.deletePublication("Best in the world");
});

app.listen(3003);
