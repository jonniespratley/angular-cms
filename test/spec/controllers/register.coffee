'use strict'

describe 'Controller: RegisterCtrl', () ->

  # load the controller's module
  beforeEach module 'angularCmsApp'

  RegisterCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    RegisterCtrl = $controller 'RegisterCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', () ->
    expect(scope.awesomeThings.length).toBe 3
