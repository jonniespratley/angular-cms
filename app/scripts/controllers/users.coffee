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
		
		DataService.endpoint = '/api/v2/angular-cms/'
		UserService = $resource('/api/v2/angular-cms/users/:id', {id:'@_id'});

		#Select user
		$scope.selectUser = (user) ->
			$scope.user = user

		#Get users
		$scope.getUsers = () ->
			DataService.fetch('users', cache: false).then((data) ->
				$scope.users = data
			)

		#Delete user
		$scope.deleteUser = (user) ->
			DataService.destroy('users', user).then((data) ->
				console.log(data)
				$scope.getUsers()
			)

		#Add user to database
		$scope.addUser = (user) ->
			UserService.save(user, (data)->
				console.log(data)
				$scope.users.push(user)
				$scope.user = {}
				$('#user-modal').modal('hide')
			)
			
)