'use strict'

describe 'Controller: PagesCtrl', () ->

	# load the controller's module
	beforeEach module 'angularCmsApp'

	PagesCtrl = {}
	scope = {}

	# Initialize the controller and a mock scope
	beforeEach inject ($controller, $rootScope, $injector) ->
		scope = $rootScope.$new()
		PagesCtrl = $controller 'PagesCtrl', {
			$scope: scope
			$log: $injector.get('$log')
			pages: []
			DataService: $injector.get('DataService')
		}

	it 'should attach a list of awesomeThings to the scope', () ->
		expect(scope.awesomeThings.length).toBe 3
