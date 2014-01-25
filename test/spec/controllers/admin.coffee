'use strict'
describe 'Controller: AdminCtrl', () ->
	AdminCtrl = null
	scope = null
	# load the controller's module
	beforeEach module 'angularCmsApp'
	
	beforeEach inject ($controller, $rootScope) ->
		scope = $rootScope.$new()
		AdminCtrl = $controller 'AdminCtrl', {
			$scope: scope
		}
	
	it 'should attach a list of awesomeThings to the scope', () ->
		expect(scope.awesomeThings.length).toBe 3
	
