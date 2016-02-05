angular.module('BookServices', ['ngResource'])
.factory('Book', ['$resource', 'Auth', function($resource, Auth) {
	return $resource('http://localhost:3000/data/books/:id');
}])
.factory('Auth', ['$window', function($window) {
	return {
		saveToken: function(token) {
			$window.localStorage['bookstore-token'] = token;
		},
		getToken: function() {
			return $window.localStorage['bookstore-token'];
		},
		removeToken: function() {
			$window.localStorage.removeItem('bookstore-token');
		}, 
		isLoggedIn: function() {
			var token = this.getToken();
			console.log(token ? true : false);
			return token ? true : false;
		},
		currentUser: function() {
			if (this.isLoggedIn()) {
				var token = this.getToken();
				try {
					var payload = JSON.parse($window.atob(token.split('.')[1]));
					return payload;
				} catch(err) {
					return false;
				}
			}
		}
	}
}])
.factory('AuthInterceptor', ['Auth', function(Auth) {
	return {
		request: function(config) {
			var token = Auth.getToken();
			if (token) {
				config.headers.Authorization = 'Bearer ' + token;
			}
			return config;
		}
	}
}])
.factory('Search', [function() {
	return {
					results: []
				}
}])
.factory('Cart', [function() {
	return {
		bag: []
	}
}]);

