const express = require('express');
// const path = require('path');
// const fs = require('fs');
const apiRoutes  = require('./routes/apiRoutes');
const htmlRoutes  = require('./routes/htmlRoutes');
const app = express();

const PORT = process.env.PORT || 8080;


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json);

// require('./routes/apiRoutes')(app);
// require('./routes/htmlRoutes')(app);

app.listen(PORT, () => {
    console.log('server is running and listening on http://localhost:' + PORT);
});