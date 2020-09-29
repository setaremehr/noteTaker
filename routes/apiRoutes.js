const path = require("path");
const fs = require('fs');

module.exports = app => {
fs.readFile("db/db.json", "utf8", function(err, data) {
    if (err) throw err;
    const dbJson = JSON.parse(data);

app.get("/api/notes", (req, res) => {
    // return all saved notes as JSON
    res.json(dbJson);
});



app.post("/api/notes", (req, res) => {
    //receive a new note to save on the request body
    let newNote = req.body 
    //  add it to the `db.json` file, and then return the new note 
    dbJson.push(newNote);
    return console.log("You got a new note: ");
});

app.get('/api/notes/:id', (req, res) => {
    res.json(dbJson[req.params.id]);
 });

app.delete("/api/notes/:id", (req, res) => {
   dbJson.splice(req.params.id, 1);
   console.log("Deleted note");
})
});
}