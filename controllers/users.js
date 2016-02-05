var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.route('/')
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err) return res.status(500).send(err);
			res.send(users);
	});
})

	.post(function(req, res) {
		User.create(req.body, function(err, user) {
			if (err) return res.status(500).send(err);
			res.send(user);
		});
	});

router.route('/:id')
	.get(function(req, res) {
		User.findById(req.params.id, function(err, user) {
			if (err) return res.send({message: 'No user found'});
			res.send(user);
		});
	})

	.put(function(req, res) {
		User.findById(req.params.id, function(err, user) {
			if (err) return res.send({message: 'No user found'});

			user.save(function(err) {
				if (err) return res.send({message: 'Error occurred when editing the user'});
				res.send(user);
			});
		});
	})

	.delete(function(req, res) {
		User.remove({_id: req.params.id}, function(err) {
			if (err) return res.send({message: 'No user found'});
			res.send({message: 'User deleted'});
		});
	});


module.exports = router;