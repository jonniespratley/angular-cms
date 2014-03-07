'use strict'
angular.module('angularCmsApp').controller 'ThemesCtrl', ($scope, $rootScope, $cookieStore) ->
	$scope.awesomeThings = [
		'HTML5 Boilerplate'
		'AngularJS'
		'Karma'
	]
	
	$scope.selectTheme = (theme) ->
		$cookieStore.put('App.theme', theme)
		$rootScope.App.theme = theme
