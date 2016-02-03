var app = angular.module('BookstoreApp', ['ngRoute', 'BookCtrls', 'BookServices']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
	.when('/', {
		templateUrl: 'app/views/home.html',
		controller: 'HomeCtrl'
	})
	.when('/books', {
		templateUrl: 'app/views/bookResults.html',
		controller: 'SearchCtrl'
	})
	.when('/books/:id', {
		templateUrl: 'app/views/book.html'
	})
	.when('/browse', {
		templateUrl: 'app/views/browse.html', 
		controller: 'BrowseCtrl'
	})
	.when('/browse/:category', {
		templateUrl: 'app/views/browseCategory.html', 
		controller: 'CategoryCtrl'
	})
	.when('/login', {
		templateUrl: 'app/views/userLogin.html'
	})
	.when('/cart', {
		templateUrl: 'app/views/userCart.html'
	})
	.when('/checkout', {
		templateUrl: 'app/views/userCheckout.html'
	})
	.otherwise({
		templateUrl: 'app/views/404.html'
	});

	$locationProvider.html5Mode(true);
}])