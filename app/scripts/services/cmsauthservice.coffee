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
angular.module('angularCmsApp').service 'cmsAuthService', ($q, $http, $log, $rootScope, $cookieStore, $location, cmsSessionService) ->

	cmsAuthService =

		#Endpoint location
		endpoint: '/api/v2'

		###*
		authorize - I handle authorizing a user.
		###
		authorize: (user) ->
			return $http.post( @endpoint+"/login", user )

		###*
		session - I handle getting a session.
		###
		session: () ->
			return $http.get( @endpoint+"/session" )

		###*
			register - I handle register a user.
		###
		register: (user) ->
			return $http.post( @endpoint+"/register", user )

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
