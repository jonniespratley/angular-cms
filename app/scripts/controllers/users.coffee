'use strict'
angular.module('angularCmsApp').controller('UsersCtrl', ($scope, DataService) ->
		$scope.awesomeThings = [
			'HTML5 Boilerplate'
			'AngularJS'
			'Karma'
		]
		
		$scope.user = 
			id: null
			username: null
			email: null
			password: null
			metadata: 
				avatar: ''
				name: null
				aboue: null
		
		$scope.users = []

		#Fetch data from api
		DataService.fetch('users').then((data) ->
			$scope.users = data
		)
		
		$scope.addUser = (user) ->
			$scope.users.push(user)
			$scope.user = {}
			$('#user-modal').modal('hide')
)