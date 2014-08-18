'use strict'

angular.module('angularCmsApp').controller 'RegisterCtrl', ($scope, $location, $log, cmsAuthService, cmsSessionService, cmsNotify) ->
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
		
		#Register the user
		cmsAuthService.register(user).then(
			(data)->
				#Login the user
				cmsAuthService.authorize(user).then(

					$log.info(data)
					
					#Welcome the user
					cmsNotify( '.message', 'info', 'Registered!', "You have registered as #{data.user.email}")

					#Set session
					cmsSessionService.setSession(user: data)

					#Change location
					$location.path('/dashboard')		
				)
			,
			(error) ->
				$log.error(error)
				cmsNotify( '.message', 'danger', 'Error!', error.message, 3)
		)

