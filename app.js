'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const port = 3000;
const httpsPort = 8000;
const passport = require('./utils/pass');

const rootRoute = require('./routes/rootRoute');
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const http = require('http');

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem')

const options = {
  key: sslkey,
  cert: sslcert
};

const app = express();

http.createServer((req, res) => {
  res.writeHead(301, { 'Location': 'https://localhost:8000' + req.url });
  res.end();
}).listen(3000);


app.use('/thumbnails', express.static('thumbnails'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('uploads'));

// routes
app.use('/', rootRoute);
app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}), catRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);

// app.listen(port, ()=> console.log("Listening"))
https.createServer(options, app).listen(httpsPort, ()=> console.log("And https"));
