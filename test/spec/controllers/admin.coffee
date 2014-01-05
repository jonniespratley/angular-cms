'use strict'

describe 'Controller: AdminCtrl', () ->

  # load the controller's module
  beforeEach module 'angularCmsApp'
  AdminCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    AdminCtrl = $controller 'AdminCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', () ->
    expect(scope.awesomeThings.length).toBe 3
