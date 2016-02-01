angular.module('BookCtrls', [])
.controller('HomeCtrl', ['$scope', function($scope) {
	console.log('test');
	angular.element(document).ready(function(){
		$(document).foundation();
	})
}]);