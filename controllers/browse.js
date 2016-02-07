var express = require('express');
var Book = require('../models/book');
var router = express.Router();

router.route('/:category')
	.get(function(req, res) {
		var regex = new RegExp(req.params.category, 'i');
		Book.find({
					genres : regex
				}, 
				function(err, books) {
					console.log(books);
					if (err) return res.status(500).send(err);
					res.send(books);
				})
		// Book.find(function(err, books) {
		// 	if (err) return res.status(500).send(err);
		// 	for (i = 0; i < books.length; i++){
		// 		if (books[i].genres[0] == req.params.category){
		// 			list.push(books[i]);
		// 		}
		// 	}
		// 	res.send(list);
		// });
	});

	module.exports = router;