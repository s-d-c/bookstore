var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var app = express();

var secret = 'ihopemyponyknowsthewaybackhome';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/bookstore');
//mongoose.connect(process.env.MONGO_URI)
// app.use('/data/search', expressJWT({secret: secret}));
// app.use('/data/books', expressJWT({secret: secret}));
// app.use('/data/browse', expressJWT({secret: secret}));
app.use('/data/users', expressJWT({secret: secret})
.unless({path: ['/data/users'], method: 'post'}));
		
app.use(function (err, req, res, next) {
	console.log('Middleware error:', err);
	if (err.name === 'UnauthorizedError') {
		res.status(401).send({message: 'You need an authorization token to view this information'})
	}
});

app.use('/data/books', require('./controllers/books'));
app.use('/data/browse', require('./controllers/browse'));
app.use('/data/search', require('./controllers/search'));
app.use('/data/users', require('./controllers/users'));
app.use('/data/auth', require('./controllers/auth'));
	
app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(process.env.PORT || 3000);