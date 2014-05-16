'use strict'
###
@module AuthService
This service will take care of authentication of a user, common methods include:
login
logout
register
forgot
currentUser
###
# AngularJS will instantiate a singleton by calling "new" on this function
angular.module('angularCmsApp').service 'cmsAuthService', ($q, $http, $log, $rootScope, $cookieStore, $location) ->

	cmsAuthService = 
		#Endpoint location
		endpoint: '/api/v2'

		###
		authorize - I handle authorizing a user.
		###
		authorize: (user) ->
			defer = $q.defer()
			$http.post( @endpoint+"/users/login", user ).success((data) ->
				defer.resolve(data)
			).error((err) ->
				defer.reject(err)
			)
			return defer.promise

		###
			register - I handle register a user.
			###
		register: (user) ->
			defer = $q.defer()
			$http.post( @endpoint+"/users/register", user ).success((data) ->
				defer.resolve(data)
			).error((err) ->
				defer.reject(err)
			)
			return defer.promise

		###
			Logout method to clear the session.
			@param {Object} user - A user model containing remember
		###
		logout: (user) ->
			#Clear cookie
			$cookieStore.put('session', null) unless session.user.remember

			#Clear session
			$rootScope.session = null

			#Change location
			$location.path($rootScope.App.logout.redirect)


