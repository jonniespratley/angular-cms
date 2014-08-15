'use strict'

angular.module('angularCmsApp').controller 'AppCtrl', ($scope, $rootScope, $http, $log, $route, $location, $routeParams, $cookieStore, cmsSessionService) ->
	
	App = Config
	App.route = $routeParams;
	App.session = cmsSessionService.getSession()
	App.theme = $cookieStore.get('App.theme')
	App.route = $route
	App.location = $location
	App.routeParams = $routeParams
	App.roles = [ 'guest', 'user', 'admin' ]
	$scope.name = 'AppCtrl'
	
	window.App = $scope.App = $rootScope.App = App
	
	angular.element(document).ready(()->
		angular.element('.nav').bind('click', 'a', (e)->
			$log.info(e);
		)
	)