'use strict'

angular.module('angularCmsApp').controller 'RegisterCtrl', ($scope, $log, cmsAuthService) ->
	$scope.awesomeThings = [
		'HTML5 Boilerplate'
		'AngularJS'
		'Karma'
	]
	$scope.user =
		username: null
		email: null
		password: null
		role: 'member'
		created: new Date()
		modified: new Date()
		metadata:
			avatar: ''
			name: null
			about: null

	#Handle registering a user
	$scope.register = (user)->
		$log.info('register', user)
		cmsAuthService.register(user)

