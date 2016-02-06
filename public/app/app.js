var app = angular.module('BookstoreApp', ['ngRoute', 'BookCtrls', 'BookServices', 'mm.foundation']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
	.when('/', {
		templateUrl: 'app/views/home.html',
		controller: 'HomeCtrl'
	})
	.when('/about', {
		templateUrl: 'app/views/about.html'
	})
	.when('/books', {
		templateUrl: 'app/views/bookResults.html',
		controller: 'SearchCtrl'
	})
	.when('/books/:id', {
		templateUrl: 'app/views/book.html',
		controller: 'ShowBookCtrl'
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
		templateUrl: 'app/views/userLogin.html', 
		controller: 'LoginCtrl'
	})
	.when('/signup', {
		templateUrl: 'app/views/userSignup.html',
		controller: 'SignupCtrl'
	})
	.when('/cart', {
		templateUrl: 'app/views/userCart.html',
		controller: 'CartCtrl'
	})
	.when('/checkout', {
		templateUrl: 'app/views/userCheckout.html'
	})
	.when('/success', {
		templateUrl: 'app/views/success.html'
	})
	.otherwise({
		templateUrl: 'app/views/404.html'
	});

	$locationProvider.html5Mode(true);
}])
.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
}])
.run(["$rootScope", "Auth", function($rootScope, Auth) {
	$rootScope.isLoggedIn = function() {
		return Auth.isLoggedIn.apply(Auth);
	};
}])

