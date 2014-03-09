'use strict'
angular.module('angularCmsApp').controller 'HelpCtrl', ($scope, $http) ->
		$scope.awesomeThings = [
			'HTML5 Boilerplate'
			'AngularJS'
			'Karma'
		]
		$scope.readmeEl = angular.element('#readme')
		$scope.loadReadme = () ->
			$http.get('/api/v2/README').success((data) ->
				$scope.readmeEl.html(data)
			)

