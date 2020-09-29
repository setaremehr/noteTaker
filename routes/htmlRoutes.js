const path = require("path");
// const addDir = path.join(__dirname, "public" );


module.exports = app => {

    // Routes
    app.get('/', (req, res) => {
        console.log("root");
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname,"../public/notes.html"));
    });
    // default to home
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
}