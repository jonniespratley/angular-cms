'use strict'
angular.module('angularCmsApp').controller 'MediaCtrl', ($scope) ->
	$scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS','Karma']
	$ ->
		$("#fileupload").fileupload(
			dataType: 'json'
			url: '/api/upload'
			dropZone: $('.uploader-dropzone')
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

