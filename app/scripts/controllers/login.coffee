'use strict'
angular.module('angularCmsApp').controller 'LoginCtrl', ($scope, $rootScope, $cookieStore) ->
		#Controller name
		$scope.name = 'login'
		
		#Setup initial model
		$scope.user = null
		
		###
		Login Method to set the session
		@param {Object} user - A user model containing username and password
		###
		$scope.login = (user) ->
			
			#Set user cookie
			$cookieStore.put('App.session.user', user) if user.remember

			#Set user session
			$rootScope.App.session.user = user
			
			#Change location
			$rootScope.App.location.path('/dashboard')
		
		###
		Logout method to clear the session
		###
		$scope.logout = (user) ->
			#Change location
			$rootScope.App.location.path('/login')

			#Clear cookie
			$cookieStore.put('App.session.user', null) unless user.remember

			#Clear session
			$rootScope.App.session.user = null
		
		
		$scope.awesomeThings = [
			'HTML5 Boilerplate'
			'AngularJS'
			'Karma'
		]
	
