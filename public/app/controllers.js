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
	$scope.categories = ["fiction", "nature", "history", "computers", "economics", "art/design"];

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
		// console.log(res);
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
		// console.log(item);
		// var book = $scope.book;

			if (item.isAvailable) {
				Cart.bag.push(item);
				item.isAvailable = false;
			} else {
				console.log('not available');
			}
	}

	$scope.alerts = [];

	 $scope.addAlert = function() {
    $scope.alerts.push({msg: "Added! View Your Bag."});
  };

}])
.controller('NavCtrl', ['$scope', '$http', '$location', '$route', '$window', 'Search', 'Cart', 'Auth', function($scope, $http, $location, $route, $window, Search, Cart, Auth) {
	$scope.searchTerm = '';
	$scope.filter = 'title';
	$scope.cartItems = Cart.bag;
	$scope.cartCount = 0;
	// console.log($scope.cartItems);

	$scope.$watchCollection('cartItems', function(newItems, oldItems) {
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
				$scope.searchTerm = '';
				if ($route.current.$$route.originalPath != '/books'){
				$location.path('/books');
				$scope.searchTerm = '';
			} else {
				$route.reload();
				$scope.searchTerm = '';
			}
				}	
		}, function error(res) {
			 console.log(res);
		});
	};

	$scope.logout = function() {
		Auth.removeToken();
		console.log('My token: ', Auth.getToken());
	}

}])

.controller('SearchCtrl', ['$scope', '$route', 'Search', function($scope, $route, Search) {
	console.log($route.current.$$route.originalPath);
	$scope.results = Search.results;
	
}])
.controller('CartCtrl', ['$scope', '$route', 'Book', 'Cart', function($scope, $route, Book, Cart){
	$scope.length = (Cart.bag.length);
	console.log($scope.length);


	$scope.userItems = Cart.bag;
		$scope.total = 0;
	$scope.userItems = Cart.bag;
	// console.log($scope.userItems[0].price);
	$scope.userItems.forEach(function(item){
		$scope.total += item.price;
	})
}])
.controller('SignupCtrl', ['$scope', '$http', '$location',  function($scope, $http, $location, Auth) {
	$scope.user = {
		email: '',
		password: ''
	};
	$scope.userSignup = function() {
		$http.post('/data/users', $scope.user).then(function success(res) {
			$http.post('/data/auth', $scope.user).then(function success(res) {
				Auth.saveToken(res.data.token);
				$location.path('/cart');
				// console.log('My token: ', Auth.getToken());
			}, function error(res) {
				console.log(data);
			});
		}, function error(res) {
			console.log(data);
		});
	}
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
	$scope.user = {
		email: '',
		password: ''
	};
	$scope.userLogin = function() {
		$http.post('/data/auth', $scope.user).then(function success(res) {
			console.log(res);
			Auth.saveToken(res.data.token);
			$location.path('/cart');
		}, function error(res) {
			console.log(res);
		});
	}
}]);


