'use strict'

describe 'Controller: HelpCtrl', () ->

  # load the controller's module
  beforeEach module 'angularCmsApp'

  HelpCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    HelpCtrl = $controller 'HelpCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', () ->
    expect(scope.awesomeThings.length).toBe 3
