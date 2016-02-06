var express = require('express');
var Book = require('../models/book');
var router = express.Router();

router.route('/:category')
	.get(function(req, res) {
		list = [];
		Book.find(function(err, books) {
			if (err) return res.status(500).send(err);
			for (i = 0; i < books.length; i++){
				if (books[i].genres[0] == req.params.category){
					list.push(books[i]);
				}
			}
			res.send(list);
		});
	});

	module.exports = router;