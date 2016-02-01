var app = angular.module('BookstoreApp', ['ngRoute', 'BookCtrls']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
	.when('/', {
		templateUrl: 'app/views/home.html',
		controller:
	})
	.when('/books', {
		templateUrl: 'app/views/bookResults.html',
		controller:
	})
	.when('/books/:id', {
		templateUrl: 'app/views/book.html',
		controller:
	})
	.when('/browse', {
		templateUrl: 'app/views/browse.html',
		controller:
	})
	.when('/browse/:category', {
		templateUrl: 'app/views/browseCategory.html',
		controller:
	})
	.when('/login', {
		templateUrl: 'app/views/userLogin.html',
		controller:
	})
	.when('/cart', {
		templateUrl: 'app/views/userCart.html',
		controller: 
	})
	.when('/checkout', {
		templateUrl: 'app/views/userCheckout.html',
		controller:
	})
	.otherwise({
		templateUrl: 'app/views/404.html'
	});

	$locationProvider.html5Mode(true);
}])