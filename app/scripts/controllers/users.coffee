'use strict'
angular.module('angularCmsApp').controller('UsersCtrl', ($scope, $resource, DataService) ->
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
		###
		DataService.endpoint = '/api/v2/angular-cms/'
		DataService.fetch('users').then((data) ->
			$scope.users = data
		)
		###
		

		UserService = $resource('/api/v2/angular-cms/users/:id', {id:'@_id'});

		#Get users
		$scope.getUsers = () ->
			UserService.get().then((data)->
				console.log(data)
				$scope.users = data
			)
		
		#Add user to database
		$scope.addUser = (user) ->
			$scope.users.push(user)
			$scope.user = {}
			$('#user-modal').modal('hide')
)