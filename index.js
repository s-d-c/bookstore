var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var app = express();

var secret = 'ihopemyponyknowsthewaybackhome';

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookstore');

app.use('data/users', expressJWT(
		{
			secret: secret
		}
	).unless(
		{
			method: "POST"
		}
	)
);

app.use('/data/books', require('./controllers/books'));
app.use('/data/browse', require('./controllers/browse'));
app.use('/data/search', require('./controllers/search'));
app.use('/data/users', require('./controllers/users'));
app.use('/data/auth', require('./controllers/auth'));
	
app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(3000);