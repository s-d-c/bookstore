var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

var mongoose = require('mongoose');
var Admin = require('./models/admin');
mongoose.connect('mongodb://localhost/bookstore');

app.use('/data/books', require('./controllers/books'));
// app.use('/data/users', require('./controllers/users'));

	
app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000);