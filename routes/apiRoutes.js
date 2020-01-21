const fs = require('fs');

let notes = [];

init();

module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    res.json(notes);
  });

  app.post("/api/index", function(req, res) {
      notes.push(req.body);
      writeToJsonFile(notes);
      res.json(true);
  });

};

function init() {
     fs.readFile("./db/notes.json", "utf8", function (err, data) {
          if (err) {
               throw err;
          }
          let notesJSON = JSON.parse(data);
          notesJSON.forEach(function (note) {
               notes.push(note);
          });
     });
};

function writeToJsonFile(notes) {
     let notesJSON = JSON.stringify(notes, null, 2);
     fs.writeFile("../db/notes.json", notesJSON, function (err) {
          if (err) {
               throw err;
          }
     });
};
