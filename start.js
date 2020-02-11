const express = require('express');
const http = require('http');
const homeRouter = require('./routs/home.js');
const regRouter = require('./routs/register_API.js');
const loginRouter = require('./routs/login_API.js');
const bodyParser = require('body-parser');

let app = express();

app.listen(8080);

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
	extended:false
}));

app.use('/home',homeRouter)
app.use('/reg',regRouter)
app.use('/login',loginRouter)