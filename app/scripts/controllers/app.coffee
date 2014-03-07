'use strict'

angular.module('angularCmsApp').controller 'AppCtrl', ['$scope', '$rootScope', '$http', '$log', '$route', '$location', '$routeParams', '$cookieStore', ($scope, $rootScope, $http, $log, $route, $location, $routeParams, $cookieStore) ->
	App = Config
	App.route = $routeParams;
	App.session = $cookieStore.get('App.session')
	App.theme = $cookieStore.get('App.theme')

	App.route = $route
	App.location = $location
	App.routeParams = $routeParams
	window.App = $rootScope.App = App
	angular.element(document).ready(()->
		$log.info('Document ready', this);
		angular.element('.sidebar-nav').bind('click', 'a', (e)->
			$log.info(e);
		)
	)

	$log.info($rootScope)
	$scope.awesomeThings = [
    'HTML5 Boilerplate'
    'AngularJS'
    'Karma'
  ]
]