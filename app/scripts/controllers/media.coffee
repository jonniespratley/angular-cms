'use strict'
angular.module('angularCmsApp').controller 'MediaCtrl', ($scope, $http, DataService) ->
	$scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma']

	$scope.uploads = []
	$scope.getUploads = () ->
		DataService.fetch('uploads').then((res)->
			$scope.uploads = res.data
		)
		$scope.uploader = {
			files: []
		};
	$scope.getUploads()
