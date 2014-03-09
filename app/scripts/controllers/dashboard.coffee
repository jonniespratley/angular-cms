'use strict'
angular.module('angularCmsApp').controller 'DashboardCtrl', ($scope) ->
	$scope.awesomeThings = [
		'HTML5 Boilerplate'
		'AngularJS'
		'Karma'
	]
	$scope.fullscreen = () ->
		i = document.getElementById("dashboard")
		# go full-screen
		if i.requestFullscreen
			i.requestFullscreen()
		else if i.webkitRequestFullscreen
			i.webkitRequestFullscreen()
		else if i.mozRequestFullScreen
			i.mozRequestFullScreen()
		else i.msRequestFullscreen()  if i.msRequestFullscreen
