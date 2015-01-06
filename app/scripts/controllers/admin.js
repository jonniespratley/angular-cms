'use strict';
angular.module('angularCmsApp').controller('AdminCtrl', function ($scope, $rootScope, socket) {
	$scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
	$scope.log = {};
	$scope.msg = {};

	$scope.send = function(obj){
		socket.emit('create', obj)
	};


	socket.on('cms:client:message', function(e, data){
		$scope.log += data;
		console.log('message back', data);
	});


	console.log('admin ready');

});
