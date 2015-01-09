'use strict';
angular.module('angularCmsApp').controller('AdminCtrl', function ($scope, $rootScope) {
	$scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
	$scope.log = {};
	$scope.msg = {};

	console.log('admin ready');

});
