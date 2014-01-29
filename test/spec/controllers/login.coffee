'use strict'

describe 'Controller: LoginCtrl', () ->

	# load the controller's module
	beforeEach module 'angularCmsApp'

	LoginCtrl = {}
	scope = {}

	# Initialize the controller and a mock scope
	beforeEach inject ($controller, $rootScope) ->
		scope = $rootScope.$new()
		LoginCtrl = $controller 'LoginCtrl', {
			$scope: scope
		}

<<<<<<< HEAD
  xit 'should attach a list of awesomeThings to the scope', () ->
    expect(scope.awesomeThings.length).toBe 3
=======
	it 'should attach a list of awesomeThings to the scope', () ->
		expect(scope.awesomeThings.length).toBe 3
	
	it 'should have a null user object', () ->
		expect(scope.user).toBeNull
	
	it 'should have a login method defined', () ->
		expect(scope.login).toBeDefined
	
	it 'should have a logout method defined', () ->
		expect(scope.logout).toBeDefined
	
>>>>>>> 1567c3acae8c1f9dd477cc7ce461cc2c5e70e8bf
