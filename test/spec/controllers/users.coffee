'use strict'

describe 'Controller: UsersCtrl', () ->

	# load the controller's module
	beforeEach module 'angularCmsApp'

	UsersCtrl = {}
	scope = {}

	# Initialize the controller and a mock scope
	beforeEach inject ($controller, $rootScope) ->
		scope = $rootScope.$new()
		UsersCtrl = $controller 'UsersCtrl', {
			$scope: scope
		}

	it 'should attach a list of awesomeThings to the scope', () ->
		expect(scope.awesomeThings.length).toBe 3

	it 'should set selected user on scope', () ->
		scope.selectUser({id: 1});
		expect(scope.user.id).toBe(1)
