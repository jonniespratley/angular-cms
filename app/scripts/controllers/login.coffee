'use strict'
###*
Login Controller - Handles the login.html view for authenticating a user.
###
angular.module('angularCmsApp').controller 'LoginCtrl', ($scope, $rootScope, $cookieStore, cmsAuthService, cmsNotify, cmsSessionService) ->

	#Setup initial model
	$scope.user =
		email: null
		password: null
		remember: false

	#$scope.user = Parse.User.current() if Parse.User.current()

	###*
		login - This functionality should be moved into the session service that handles
		setting the session and changing the location of the page.
	###
	$scope.login = (u) ->
		cmsAuthService.authorize(u).then(
			(res)->

				#Welcome the user
				cmsNotify( '.login-message', 'success', 'Success!', "Welcome back.", 5000)

				#Set user session
				session =
					user: res.data.result
					authorized: true

				#Set user cookie
				cmsSessionService.setSession(session)

				#Set session on scope
				$rootScope.App.session = session

				#Change location
				$rootScope.App.location.path('/dashboard')
			,
			(err)->
				console.error(err)
				cmsNotify( '.login-message', 'danger', 'Error!', err.data.message, 2500)
		)

	###
	Login Method to set the session.
	@param {Object} user - A user model containing username and password

	$scope._login = (u) ->
		console.log(u)
		Parse.User.logIn u.username, u.password,
			success: (user) ->
				console.log user
				$scope.$apply(()->
					#Set user session
					session =
						user: user.attributes
						authorized: true

					console.log('save sessin', session)
					#Set user cookie
					$cookieStore.put('App.session', session) if u.remember
					$rootScope.App.session = session
					#Change location
					$rootScope.App.location.path('/dashboard')
				)
			error: (user, error) ->
				$scope.$apply(()->
					$scope.error = error;
				)
	###

	$scope.logout = (user) ->


		#Clear cookie
		$cookieStore.put('App.session', null)

		#Clear session
		$rootScope.App.session = null

		#Change location
		$rootScope.App.location.path($rootScope.App.logout.redirect)


	#Controller name
	$scope.name = 'login'
