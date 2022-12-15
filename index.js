var express = require('express');
var cors = require('cors');
var app = express();
const path = require('path')
const port = 8080;
const app = express();

app.use(express.static('./dist'))
app.set('view engine', 'IRP3.0');
// const app = express();
// app.use(express.static('../dist/interior'))//set the static path 
// app.set('view engine', 'pug');

const gogoleOauth = require('google-oauth-jwt');
const { resolve } = require('path');
const config = require('./newagent-u9ii.json');

// const config = {
//     "private_key": config.private_key,
//     "client_email": config.private_key
// }
const getToken = async () => {
    return new Promise((resolve) => {
        gogoleOauth.authenticate({
            email: config.client_email,
            key: config.private_key,
            scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/dialogflow']
        }, (err, token) => {
            console.log('t', token);
            resolve(token);
        })
    })
}

app.get('/getToken', cors(), async function (req, res, next) {
    let token = await getToken();
    console.log('token', token);
    res.send({ 'access_token': token });
})
app.all('*', (req, res) => {
    //res.render('appLoader');
    res.header('Referrer-Policy', 'origin');
    res.status(200).sendFile(path.resolve(__dirname, './dist/index.html'));
});


app.listen(port, function () {
    console.log('CORS-enabled web server listening on port: ' + port);
})
