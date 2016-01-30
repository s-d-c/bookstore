var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
	title: String,
	author: String,
	year: Number,
	image: String,
	binding: String,
	condition: String,
	edition: String,
	rating: Number,
	price: Number,
	isAvailable: Boolean,
	created_at: Date,
	updated_at: Date
});

BookSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});