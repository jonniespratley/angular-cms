'use strict'
angular.module('angularCmsApp').controller 'MediaCtrl', ($scope, $http, DataService) ->
	$scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS','Karma']

	$scope.uploads = []
	$scope.getUploads = () ->
		$http.get('/api/v2/uploads?path=routes/public').success((data)->
			$scope.uploads = data
		)

	
		$scope.uploader = {
			files: []
		};

