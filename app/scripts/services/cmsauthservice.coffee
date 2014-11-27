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
angular.module('angularCmsApp').service 'cmsAuthService', ($q, $http, $log, $rootScope, $cookieStore, $location) ->

	cmsAuthService =

		#Endpoint location
		endpoint: '/api/v2'

		###*
		authorize - I handle authorizing a user.
		###
		authorize: (user) ->
			return $http.post( @endpoint+"/users/login", user )

		###*
			register - I handle register a user.
		###
		register: (user) ->
			return $http.post( @endpoint+"/users/register", user )

		###*
			Logout method to clear the session.
			@param {Object} user - A user model containing remember
		###
		logout: (user) ->

			#Clear cookie
			$cookieStore.put('session', null) unless session.user.remember

			#Clear session
			$rootScope.session = null

			$rootScope.apply(()->
				#Change location
				$location.path($rootScope.App.logout.redirect)
			)
