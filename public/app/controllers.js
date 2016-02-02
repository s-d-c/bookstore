angular.module('BookCtrls', ['BookServices'])
.controller('HomeCtrl', ['$scope', 'Book', function($scope, Book) {

	angular.element(document).ready(function(){
		$(document).foundation();
	});

	$scope.books = [];

	Book.query(function success(data) {
		$scope.books = data;
		console.log($scope.books);
	}, function error(data) {
		console.log(data)
	});

}])

