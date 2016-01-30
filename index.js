var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookstore');

app.get('/', function(req, res) {
	res.send('Hi!');
});

app.listen(3000);