var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var addData = require("./database/addData.js");
var deleteData = require("./database/deleteData.js");
var showResearch = require("./database/showResearch.js");
var showOneArticle = require("./database/showOneArticle.js");

/* var arrayOfInputObjects = [
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
]; */

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/list", (req, res) => {
  //console.log(req.body);
  var type_of_article = req.body.type_of_article;
  showResearch.showResearchList(type_of_article, function(f1, f2) {
    var a = {
      arrayToBeSentToWebsite: f1,
      arrayOfAuthorEmails: f2
    };
    res.json(a);
  });
});

app.post("/addNewPublication", (req, res) => {
  // console.log(req.body);
  // var author = req.body.author;
  // var emailId = req.body.emailId;
  // var passWord = req.body.title;
  var arrayOfInputObjects = req.body;
  addData.addPublication(arrayOfInputObjects);
});

app.post("/deletePublication", (req, res) => {
  var title = req.body.title;
  deleteData.deletePublication(title);
});

app.post("/showOneArticle", (req, res) => {
  var title = req.body.title;
  showOneArticle.showOneArticle(title, function(f1) {
    res.json(f1);
  });
});

module.exports = app;
