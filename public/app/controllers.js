angular.module('BookCtrls', ['BookServices', 'mm.foundation'])
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
.controller('ShowBookCtrl', ['$scope', '$routeParams', 'Book', function($scope, $routeParams, Book){
	$scope.book = {};

	Book.get(
		{id: $routeParams.id},
		function success(data){
			$scope.book = data;
			console.log(data);
		},
		function error(data){
		})
}])

.controller('NavCtrl', ['$scope', '$http', '$location', '$route', 'Search', function($scope, $http, $location, $route, Search) {
	$scope.searchTerm = '';
	$scope.filter = 'title';

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
				Search.results = res.data;
				if ($route.current.$$route.originalPath != '/books'){
				$location.path('/books');
			} else {
				$route.reload();
			}
	
				
			}			
		}, function error(res) {
			 console.log(res);
		});
	};

}])

.controller('SearchCtrl', ['$scope', '$route', 'Search', function($scope, $route, Search) {
	console.log($route.current.$$route.originalPath);
	$scope.results = Search.results;
	
}])


