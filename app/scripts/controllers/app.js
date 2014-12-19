'use strict';
angular.module('angularCmsApp').controller('AppCtrl', function ($scope, $rootScope, $http, $log, $route, $location, $routeParams, $cookieStore, cmsSessionService, DataService, cmsSocketService) {
	var App;
	App = angular.copy(Config);
	App.ds = DataService;
	App.socket = cmsSocketService;


	App.route = $routeParams;
	App.session = cmsSessionService.getSession();
	App.theme = $cookieStore.get('App.theme');
	App.route = $route;
	App.location = $location;
	App.routeParams = $routeParams;
	App.roles = ['guest', 'user', 'admin'];


	$scope.name = 'AppCtrl';

	window.App = $scope.App = $rootScope.App = App;


	angular.element(document).ready(function () {
		angular.element('.nav').bind('click', 'a', function (e) {
			$log.info(e);
		});
	});
});
