const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const PORT= 8080;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json);

// Routes

app.get('/', (req, res) => {
    console.log("root");
    res.sendFile(path.join(__dirname, "index.html"));
});


app.listen(PORT, () => {
    console.log("successfully started on : " + PORT);
})