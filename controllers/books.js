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

router.route('/:id')
	.get(function(req, res) {
		Book.findById(req.params.id, function(err, book) {
			if (err) return res.status(500).send(err);
			res.send(book);
		});
	})
	.put(function(req, res) {
		Book.findByIdAndUpdate(req.params.id, req.body, function(err) {
			if (err) return res.status(500).send(err);
			res.send({'message': 'success'});
		});
	})
	.delete(function(req, res) {
		Book.findByIdAndRemove(req.params.id, function(err) {
			if(err) return res.status(500).send(err);
			res.send({'message': 'success'});
		});
	});
	
	module.exports = router;