const express = require('express');
const app = express();
const port = 3000;
const http = require('http')

//Display a list of all the account in the org
app.get('/', function(req, res) {
    res.sendFile('views/index.html');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));