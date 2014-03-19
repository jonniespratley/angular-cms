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
angular.module('angularCmsApp').service 'cmsAuthService', ($q, $http, $log) ->

	cmsAuthService = 
		#Endpoint location
		endpoint: '/api/v2/angular-cms/users/login'

		###
		authorize - I handle authorizing a user.
		###
		authorize: (user) ->
			defer = $q.defer()
			$http.post( @endpoint, user ).success((data) ->
				$log.info(data)
				defer.resolve(data)
			).error((err) -> 
				$log.info(err)
				defer.reject(err)
			)
			return defer.promise
		
