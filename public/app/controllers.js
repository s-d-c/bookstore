angular.module('BookCtrls', ['BookServices', 'mm.foundation'])
.controller('HomeCtrl', ['$scope', 'Book', function($scope, Book) {

	$scope.books = [];

	Book.query(function success(data) {
		$scope.books = data;
		// console.log($scope.books);
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
.controller('ShowBookCtrl', ['$scope', '$routeParams', 'Book', 'Cart', function($scope, $routeParams, Book, Cart){

	$scope.cart = [];

	Book.get(
		{id: $routeParams.id},
		function success(data){
			$scope.book = data;
		},
		function error(data){
		});

	$scope.addToCart = function (item) {
		console.log(item);
		// var book = $scope.book;

			if (item.isAvailable) {
				Cart.bag.push(item);
				item.isAvailable = false;
			} else {
				console.log('not available');
			}
	}

}])
.controller('NavCtrl', ['$scope', '$http', '$location', '$route', '$window', 'Search', 'Cart', function($scope, $http, $location, $route, $window, Search, Cart) {
	$scope.searchTerm = '';
	$scope.filter = 'title';
	$scope.cartItems = Cart.bag;
	$scope.cartCount = 0;
	console.log($scope.cartItems);

	$scope.$watchCollection('cartItems', function(newItems, oldItems) {
  	console.log(newItems.length);
  	$scope.cartCount = newItems.length;
	});

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
				console.log(res.data);
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
.controller('CartCtrl', ['$scope', '$route', 'Book', 'Cart', function($scope, $route, Book, Cart){
	console.log(Cart.bag);
	$scope.userItems = Cart.bag;
	console.log($scope.userItems);
}])

