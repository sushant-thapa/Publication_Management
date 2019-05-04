export default class DataServer {
  addNewPublication(sampleRecord) {
    var addData = require("./database/insert.js");
    var checkForDuplicate = require("./database/checkForDuplicate.js");
    checkForDuplicate.checkForDuplicate(sampleRecord.title, function(f1) {
      if (f1 == false) {
        addData.addPublication(sampleRecord);
      }
    });
  }

  deletePublication(title) {
    var deleteData = require("./database/delete.js");
    deleteData.deletePublication(title);
  }

  list(type_of_article) {
    var showResearch = require("./database/show.js");
    showResearch.showResearchList(type_of_article, function(f1) {
      //f1 is array of json from database
    });
  }

  showOneArticle(title) {
    var showOneArticle = require("./database/returnDetailOfTitle.js");
    showOneArticle.showOneArticle(title, function(f1) {
      //f1 is array of json from database
    });
  }
}
