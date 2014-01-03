'use strict'

angular.module('angularCmsApp')
	.controller 'MainCtrl', ($scope, $rootScope) ->
		$rootScope.angularCmsApp.sidebar.visible = false
		$scope.awesomeThings = [
			'HTML5 Boilerplate'
			'AngularJS'
			'Karma'
		]
