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

					#Set user session
					session =
						user: data.user
						authorized: true

					#Set user cookie
					cmsSessionService.setSession(session)

					#Change location
					$location.path('/dashboard')
				)
			,
			(err) ->
				$log.error(err)
				cmsNotify( '.message', 'danger', 'Error!', err.data.message, 4000)
		)
