angular.module('BookServices', ['ngResource'])
.factory('Book', ['$resource', 'Auth', function($resource, Auth) {
	return $resource('https://walldeskfloor.herokuapp.com/data/books/:id');
}])
.factory('Search', [function() {
	return {
					results: []
				}
}])
.factory('Cart', [function() {
	return {
		bag: [],

		isInBag: function(bag, book) {
			for (i = 0; i < bag.length; i++) {
				if (bag[i]._id === book._id) {

					return true;
				}
			}
			return false;
		}
	}

}])
.factory('Auth', ['$window', "$rootScope", function($window) {
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


