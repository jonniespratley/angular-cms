'use strict'

describe 'Controller: WidgetsCtrl', () ->

  # load the controller's module
  beforeEach module 'angularCmsApp'

  WidgetsCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    WidgetsCtrl = $controller 'WidgetsCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', () ->
    expect(scope.awesomeThings.length).toBe 3
