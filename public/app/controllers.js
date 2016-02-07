angular.module('BookCtrls', ['BookServices', 'mm.foundation'])
.controller('HomeCtrl', ['$scope', 'Book', 'Cart', function($scope, Book, Cart) {

	$scope.books = [];

	Book.query(function success(data) {
		$scope.books = data;
		// console.log($scope.books);
	}, function error(data) {
		console.log(data)
	});

}])
.controller('BrowseCtrl', ['$scope','Book', '$http', function($scope, Book, $http) {
	$scope.categories = {"fiction"     : 'http://i.imgur.com/0NE2bkD.jpg?1', 
												"nature"     : 'http://i.imgur.com/uvhL9fu.jpg?1',
												"history"    : 'http://i.imgur.com/Li4bUjH.jpg?1',
												"economics"  : 'http://i.imgur.com/9txSTzY.jpg'
											};
	
	
}])
.controller('CategoryCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	$scope.bookList = [];
	
	$http({
		url: "https://walldeskfloor.herokuapp.com/data/browse/" + $routeParams.category,
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

	Book.get(
		{id: $routeParams.id},
		function success(data){
			$scope.book = data;
		},
		function error(data){
		});
	

		 $scope.alerts = [];
		 $scope.hey = [];

	$scope.cart = Cart.bag;
	$scope.carts = 0;

	$scope.addAlert = function() {
    		$scope.alerts.push({type: 'danger', msg: "Added to Cart!"});
    			$scope.isAlert = function() {
		return $scope.alerts ? true : false;
	}
  			};
  			$scope.closeAlert = function(index) {
    		$scope.alerts.splice(index, 1);
  			};

	$scope.addToCart = function (item) {
			if (!Cart.isInBag(Cart.bag, $scope.book)) {
				Cart.bag.push(item);
				item.isAvailable = false;
				$scope.$watchCollection('cart', function(newItems, oldItems) {
  			$scope.carts = newItems.length;

				});
			} else {
				$scope.addAlert = function() {
    		$scope.alerts.push({type: 'alert', msg: "Already in Cart!"});
    			$scope.isAlert = function() {
		return $scope.alerts ? true : false;
	}
  			};
  			$scope.closeAlert = function(index) {
    		$scope.alerts.splice(index, 1);
  			};
				console.log('not available');	
			}
	}

	$scope.isActive = false;
  $scope.activeButton = function() {
    $scope.isActive = !$scope.isActive;
  } 

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

	$scope.back = function() {
		$window.history.back();
	}

	$scope.search = function() {
		var req = {
			url: "https://walldeskfloor.herokuapp.com/data/search/",
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
		$scope.$watchCollection('cartItems', function(newItems, oldItems) {
  	$scope.cartCount = 0;
			});
		Cart.bag = [];
		Auth.removeToken();
		$location.path('/');
	};

}])

.controller('SearchCtrl', ['$scope', '$route', 'Search', function($scope, $route, Search) {
	
	console.log($route.current.$$route.originalPath);
	$scope.results = Search.results;

}])
.controller('CartCtrl', ['$scope', '$route', 'Book', 'Cart', function($scope, $route, Book, Cart){
	$scope.length = (Cart.bag.length);
	console.log($scope.length);
	// $scope.cartCount = 0;

	$scope.userItems = Cart.bag;
		$scope.total = 0;
	// console.log($scope.userItems[0].price);
	$scope.userItems.forEach(function(item){
		$scope.total += item.price;
	});

	$scope.removeItem = function(item) {
		for (i=0; i < Cart.bag.length; i++) {
			if (Cart.bag[i] === item) {
				Cart.bag.splice(i, 1);
				$scope.total -= item.price;
			}
		}
	}

}])
.controller('SignupCtrl', ['$scope', '$http', '$location', 'Auth',  function($scope, $http, $location, Auth) {
	$scope.user = {
		name: {},
		email: '',
		password: '',
		address: {}
	};
	console.log($scope.user);
	$scope.userSignup = function() {
		$http.post('/data/users', $scope.user).then(function success(res) {
			$http.post('/data/auth', $scope.user).then(function success(res) {
				Auth.saveToken(res.data.token);
				$location.path('/success');
				// console.log('My token: ', Auth.getToken());
			}, function error(res) {
				console.log(res);
			});
		}, function error(res) {
			console.log(res);
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
			$location.path('/success');
		}, function error(res) {
			console.log(res);
		});
	}
}])
.controller('CheckoutCtrl', ['$scope', 'Book', 'Cart', function($scope, Book, Cart){

	$scope.length = Cart.bag.length;
	$scope.orderSummary = Cart.bag;
	$scope.total = 0;

	$scope.orderSummary.forEach(function(item){
		$scope.total += item.price;
		console.log($scope.checkout);
	})

	$scope.stripeCallback = function (code, result) {
    $scope.processing = false;
			$scope.hideAlerts();
			if (result.error) {
				$scope.stripeError = result.error.message;
			} else {
				$scope.stripeToken = result.id;
			}
	};

	$scope.hideAlerts = function () {
				$scope.stripeError = null;
				$scope.stripeToken = null;
			};
}])


