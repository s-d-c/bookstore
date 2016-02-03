angular.module('BookServices', ['ngResource'])
.factory('Book', ['$resource', function($resource) {
	return $resource('http://localhost:3000/data/books/:id');
}])
.factory('Search', [function() {
	return {
					results: []
				}
}])