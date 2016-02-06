var express = require('express');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var router = express.Router();

var secret = 'ihopemyponyknowsthewaybackhome';

router.route('/')
	.post(function(req, res) {
		
		User.findOne({email: req.body.email}, function(err, user) {
			if (err || !user) return res.status(500).send({message: 'User not found'});
			user.authenticated(req.body.password, function(err, result) {
				if (err || !result) return res.send({message: 'User not authenticated'});

				var token = jwt.sign(user, secret);
				res.send({user: user, token: token});
			});
		});
	});

module.exports = router;