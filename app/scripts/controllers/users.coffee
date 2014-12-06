'use strict'
angular.module('angularCmsApp').controller('UsersCtrl', ($scope, DataService) ->
		$scope.awesomeThings = [
			'HTML5 Boilerplate'
			'AngularJS'
			'Karma'
		]

		$scope.user =
			username: null
			email: null
			password: null
			role: 'member'
			created: new Date()
			modified: new Date()
			metadata:
				avatar: ''
				name: null
				about: null

		#Hold the users
		$scope.users = []

		#Holds the user groups
		$scope.groups = ['Admin', 'Member', 'Public']

		$scope.getGroups = () ->
			DataService.fetch('groups').then((res) ->
				$scope.groups = res.data
				console.log(data)
			)

		#Select user
		$scope.selectUser = (user) ->
			$scope.user = user

		#Get users
		$scope.getUsers = () ->
			DataService.fetch('users').then((res) ->
				$scope.users = res.data
				$scope.getGroups() unless $scope.groups
			)

		#Delete user
		$scope.deleteUser = (index, user) ->
			ask = confirm "Delete #{user.email}?"

			if ask
				DataService.destroy('users', user).then((res) ->
					$scope.users.pop(index)
					$scope.getUsers()
				)

		#Add user to database
		$scope.addUser = (user) ->
			DataService.save('users', user).then((data) ->
				$scope.getUsers()
				$scope.users.push(user) unless user._id
				$scope.user = {}
				console.log(data)
				$('#user-modal').modal('hide')
			)

)
