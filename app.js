const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const https = require('https');
const querystring = require('querystring');
const url = require('url');

const CLIENT_ID = '3MVG9fTLmJ60pJ5KsAIY_SDssNp.LJMszR8cxFmXCR45fR..1Xi.sv0jjao4BRSkjUcKQyEeKq8t7Yko_07xB';
const CLIENT_SECRET_ID = '5771926701866322237';
const REDIRECT_URI = 'http%3A%2F%2Flocalhost%3A3000%2Foauth-redirect';

let token = {};


//Display a list of all the account in the org
app.get('/', function(req, res) {
    res.send('hello world');
});

app.get('/oauth2/auth', function(req, res) {
    let url = 'http://login.salesforce.com/services/oauth2/authorize'
                + '?response_type=code' 
                + '&client_id=' + CLIENT_ID
                + '&redirect_uri=' + REDIRECT_URI;
    
    res.redirect(url);

});


app.get('/oauth-redirect', function(req, res) {
    //let code = req.query.code;
    /*let data = JSON.stringify({
        grant_type : 'authorization_code',
        client_secret : '5771926701866322237',
        client_id : '3MVG9fTLmJ60pJ5KsAIY_SDssNp.LJMszR8cxFmXCR45fR..1Xi.sv0jjao4BRSkjUcKQyEeKq8t7Yko_07xB',
        redirect_uri : 'http://localhost:3000/oauth-token',
        code : req.query.code
    });*/
    let data =    'grant_type=authorization_code' 
                        + '&code=' + req.query.code
                        + '&client_id=' + CLIENT_ID
                        + '&client_secret=' + CLIENT_SECRET_ID
                        + '&redirect_uri=' + 'http%3A%2F%2Flocalhost%3A3000%2Foauth-token';
    console.log(data);

    let options = {
        protocol : 'https:',
        host : 'login.salesforce.com',
        method : 'POST',
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Content-Length' : data.length
        },
        path : '/services/oauth2/token'
    };

    let stringData = "";

    let request = https.request(options, function(response) {
        console.log(`STATUS: ${response.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
        response.setEncoding('utf8');
        response.on('data', (data) => {
            console.log(`BODY: ${data}`);
            stringData += data;
        });
        response.on('end', () => {
            console.log('No more data in response');
            token = JSON.parse(stringData);
        });
    });

    request.write(data);
    request.end();
    res.send("1");
});

app.get('/oauth-token', function(req, res) {
    res.send("2");
});

app.get('/accounts', (req, res) => {

    let myURL = new URL(token.instance_url);

    let query = querystring.stringify({q : "SELECT name from Account"});
    console.log(query);
    let options = {
        protocol : 'https:',
        host : myURL.host,
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            Authorization : token.token_type + ' ' + token.access_token
        },
        //auth : token.token_type + ' ' + token.access_token,
        path : '/services/data/v44.0/query/?' + query
    }
    console.log(options);


    let request = https.request(options, function(response) {
        console.log(`STATUS: ${response.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
        response.setEncoding('utf8');
        response.on('data', (data) => {
            console.log(`BODY: ${data}`);
        });
        response.on('end', () => {
            console.log('No more data in response');
        });
    });

    request.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    request.end()
    res.send("here");
    

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

