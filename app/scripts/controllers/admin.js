'use strict';
angular.module('angularCmsApp').controller('AdminCtrl', function ($scope, $rootScope, cmsSocketService) {
	$scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
	$scope.msg = {};

	$scope.send = function(obj){
		$rootScope.App.socket.send(obj)
	};

	$rootScope.App.socket.on('angular-cms', function(e, data){
		console.log('message back', data);
	});
	console.log('admin ready');

});
