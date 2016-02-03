angular.module('BookCtrls', ['BookServices'])
.controller('HomeCtrl', ['$scope', 'Book', function($scope, Book) {

	angular.element(document).ready(function(){
		$(document).foundation();
	});

	$scope.books = [];

	Book.query(function success(data) {
		$scope.books = data;
		//console.log($scope.books);
	}, function error(data) {
		console.log(data)
	});

}])
.controller('BrowseCtrl', ['$scope','Book', function($scope, Book) {
	$scope.categories = ["fiction", "nature", "history", "computers"];

}])
.controller('CategoryCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	$scope.bookList = [];

	$http({
		url: "http://localhost:3000/data/browse/" + $routeParams.category,
		method: 'GET'
	}).then(function success(res) {
		if (res.status === 200) {
			$scope.bookList = res.data;
		}
		console.log(res);
	}, function error(res) {
		console.log(res);
	});
}])

.controller('SearchCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
	$scope.searchTerm = 'Great Jones Street';
	$scope.filter = 'title';
	$scope.bookList = [];

	$scope.search = function() {
		var req = {
			url: "http://localhost:3000/data/search/",
			method: 'GET',
			params: {
				s: $scope.searchTerm,
				f: $scope.filter
			}
		}
		$http(req).then(function success(res) {
			if (res.status === 200){
				
				$location.path('/books');
				$scope.bookList = res.data;
				console.log(res.data);
			}
			
		}, function error(res) {
			 console.log(res);
		});
	};
}])


