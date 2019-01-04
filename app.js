const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const CLIENT_ID = '3MVG9fTLmJ60pJ5KsAIY_SDssNp.LJMszR8cxFmXCR45fR..1Xi.sv0jjao4BRSkjUcKQyEeKq8t7Yko_07xB';
const CLIENT_SECRET_ID = '5771926701866322237';
const REDIRECT_URI = 'http%3A%2F%2Flocalhost%3A3000%2Foauth-redirect';

//Display a list of all the account in the org
app.get('/', function(req, res) {
    res.send('hello world');
});

app.get('/oauth2/auth', function(req, res) {
    let url = 'https://login.salesforce.com/services/oauth2/authorize'
                + '?response_type=code' 
                + '&client_id=' + CLIENT_ID
                + '&redirect_uri=' + REDIRECT_URI;
    
    res.redirect(url);

});

app.get('/oauth-redirect', function(req, res) {
    res.send('<h1>WORKING I THINK<h1>');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

