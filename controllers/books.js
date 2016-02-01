var express = require('express');
var Book = require('../models/book');
var router = express.Router();

router.route('/')
	.get(function(req, res) {
		Book.find(function(err, books) {
			if (err) return res.status(500).send(err);
			res.send(books);
		});
	})
	.post(function(req, res) {
		Book.create(req.body, function(err, book) {
			if (err) return res.status(500).send(err);
			res.send(book)
		});
	});
	

	module.exports = router;