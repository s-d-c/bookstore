var express = require('express');
var Book = require('../models/book');
var router = express.Router({mergeParams: true});

router.route('/')
	.get(function(req, res) {
			//var search = req.query.s;
			var regex = new RegExp(req.query.s, 'i');
			console.log(regex);
			var filter = req.query.f;

			if (filter === 'author'){
				Book.find({
					author: regex
				},
				function(err, books) {
				console.log(books);
				if (err) return res.status(500).send(err);
				res.send(books);
				})
			}	else if (filter === 'title') {
				Book.find({
					title : regex
				},
				function(err, books) {
					console.log(books);
					if (err) return res.status(500).send(err);
					res.send(books);
				})
			} else {
				Book.find({
					genres : regex
				}, 
				function(err, books) {
					console.log(books);
					if (err) return res.status(500).send(err);
					res.send(books);
				})
			};
	});
			
	
module.exports = router;