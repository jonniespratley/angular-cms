'use strict'

describe 'Controller: ThemesCtrl', () ->

  # load the controller's module
  beforeEach module 'angularCmsApp'

  ThemesCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    ThemesCtrl = $controller 'ThemesCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', () ->
    expect(scope.awesomeThings.length).toBe 3
