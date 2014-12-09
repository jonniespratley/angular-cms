'use strict'
###*
@module AuthService
@description
This service will take care of authentication of a user, common methods include:
* authorize
* logout
* register
* forgot
* currentUser
###
# AngularJS will instantiate a singleton by calling "new" on this function
angular.module('angularCmsApp').service 'cmsAuthService', ($q, $http, $log, $rootScope, $cookieStore, $location, cmsSessionService, cmsNotify) ->
	cmsAuthService =
		#Endpoint location
		endpoint: '/api/v2'

		###*
		authorize - I handle authorizing a user.
		###
		authorize: (user) ->
			return $http.post(@endpoint + "/login", user)

		###*
		session - I handle getting a session.
		###
		session: () ->
			return $http.get(@endpoint + "/session")

		###*
			register - I handle register a user.
		###
		register: (user) ->
			return $http.post(@endpoint + "/register", user)

		###*
			Logout method to clear the session.
			@param {Object} user - A user model containing remember
		###
		logout: (user) ->
			#Clear cookie
			cmsSessionService.logout(null)
			$rootScope.apply(()->
				$location.reload()
			)
		###*
 			Login
		###
		login: (user) ->
			@authorize(user).then((res) ->
				#Welcome the user
				cmsNotify('.login-message', 'success', 'Success!', "Welcome back.", 5000)

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
			, (err)->
				console.error(err)
				cmsNotify('.login-message', 'danger', 'Error!', err.data.message)
			)
