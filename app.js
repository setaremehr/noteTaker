const express = require('express');
const path = require('path');
const fs = require('fs');
var util = require('util');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const writefileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

  // Routes 
app.get('/', (req, res) => {
    console.log("root");
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get('/notes', (req, res) => {

    res.sendFile(path.join(__dirname, "../public/notes.html"));
    // console.log("i am a note");

});
app.get("/api/notes", (req, res) => {
    readFileAsync(path.join(__dirname, 'db/db.json'), 'utf8')
        .then(data => {
            return res.json(JSON.parse(data));
        });
});

app.post("/api/notes", (req, res) => {
    let newNote = req.body
    readFileAsync(path.join(__dirname, 'db/db.json'), 'utf8')
        .then(data => {
            allNotes = JSON.parse(data);
            if (newNote.id || newNote.id === 0) {
                let currNote = allNotes[newNote.id];
                currNote.title = newNote.title;
                currNote.text = newNote.text;
            } else {
                allNotes.push(newNote);
            }
            writefileAsync(path.join(__dirname, 'db/db.json'), JSON.stringify(allNotes))
                .then(() => {
                    console.log('done');
                })
        })
    res.json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
    var id = req.params.id;
    readFileAsync(path.join(__dirname, "./db/db.json"), "utf8")
        .then( data => {
            allNotes = JSON.parse(data);
            allNotes.splice(id, 1);
            writefileAsync(path.join(__dirname, "./db/db.json"), JSON.stringify(allNotes))
                .then( () => {
                    console.log('deleted a note');
                })
        });
    res.json(id);
});


app.listen(PORT, () => {
    console.log("server started");
});