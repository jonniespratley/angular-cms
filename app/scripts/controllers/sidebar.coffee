'use strict'

angular.module('angularCmsApp')
	.controller 'SidebarCtrl', ($scope, $rootScope) ->
		$scope.awesomeThings = [
			'HTML5 Boilerplate'
			'AngularJS'
			'Karma'
		]

		$scope.items = $rootScope.App.menu.user	
		$scope.selected = null
		
		$scope.select = (item) ->
			angular.forEach $rootScope.App.menu.admin, (item) ->
				item.selected = false
				console.log item
			angular.forEach $rootScope.App.menu.user, (item) ->
				item.selected = false
				console.log item
			
			item.selected = true
	
