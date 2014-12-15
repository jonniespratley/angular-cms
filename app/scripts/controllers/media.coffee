'use strict'
angular.module('angularCmsApp').controller 'MediaCtrl', ($scope, $http, DataService) ->
	$scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS','Karma']

	$scope.uploads = []
	$scope.getUploads = () ->
		DataService.fetch('uploads').then((res)->
			$scope.uploads = res.data
		)

	$ ->
		$("#fileupload").fileupload(
			dataType: 'json'
			dropZone: $('.dropzone')
			add: (e, data) ->
				console.log(e, data)

				data.url = '/api/upload'
				data.context = $('<p/>').text('Uploading...').appendTo(document.body)
				data.submit()
			progressall: (e, data) ->
				progress = parseInt(data.loaded / data.total * 100, 10)
				$("#progress .bar").css "width", progress + "%"
			done: (e, data) ->
				$.each data.result.files, (index, file) ->
					$("<p/>").text(file.name).appendTo document.body
		)

		$scope.uploader = {
			files: []
		};

