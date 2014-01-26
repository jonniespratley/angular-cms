'use strict'
#Login Controller - Handles the login.html view for authenticating a user.
angular.module('angularCmsApp').controller 'LoginCtrl', ($scope, $rootScope, $cookieStore) ->
	#Setup initial model
	$scope.user = 
		username: null
		password: null
		remember: false
	
	#$scope.user = Parse.User.current() if Parse.User.current()
	
	###
	Login Method to set the session.
	@param {Object} user - A user model containing username and password
	###
	$scope.login = (u) ->
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
	Logout method to clear the session.
	@param {Object} user - A user model containing remember
	###
	$scope.logout = (user) ->
		#Clear cookie
		$cookieStore.put('App.session', null) unless App.session.user.remember
		#Clear session
		$rootScope.App.session = null
		#Change location
		$rootScope.App.location.path($rootScope.App.logout.redirect)
	
	#Controller name
	$scope.name = 'login' 
