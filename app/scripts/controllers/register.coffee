'use strict'

angular.module('angularCmsApp').controller 'RegisterCtrl', ($scope, $location, cmsAuthService, cmsSessionService, cmsNotify) ->
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
		console.log('register')
		cmsAuthService.register(user).then(
			(data)->
				console.log(data)
				#Welcome the user
				cmsNotify( '.message', 'info', 'Registered!', "You have registered as #{data.user.email}")
				cmsSessionService.setSession(user: data)
				$location.path('/dashboard')
			,
			(error) ->
				console.log(error)
				cmsNotify( '.message', 'danger', 'Error!', error.message)
		)

