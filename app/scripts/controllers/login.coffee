'use strict'
angular.module('angularCmsApp').controller 'LoginCtrl', ($scope, $rootScope, $cookieStore, $http) ->
		
		#Setup initial model
		$scope.user = null
		
		###
		Login Method to set the session
		@param {Object} user - A user model containing username and password
		###
		$scope.login = (user) ->
			$http.post('/api/v2/angular-cms/users/login').success((results)->
				console.log(results)
			).error((error) ->
				console.log(error)
			)
			
			#Change location
			$rootScope.App.location.path('/dashboard')

			#Set user cookie
			$cookieStore.put('App.session.user', user)

			#Set user session
			$rootScope.App.session.user = user
		
		###
		Logout method to clear the session
		###
		$scope.logout = () ->
			#Change location
			$rootScope.App.location.path('/')

			#Clear cookie
			$cookieStore.put('App.session.user', null)

			#Clear session
			$rootScope.App.session.user = null
		
		
		$scope.awesomeThings = [
			'HTML5 Boilerplate'
			'AngularJS'
			'Karma'
		]
	
