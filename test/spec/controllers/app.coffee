'use strict'

describe 'Controller: AppCtrl', () ->

  # load the controller's module
  beforeEach module 'angularCmsApp'

  AppCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    AppCtrl = $controller 'AppCtrl', {
      $scope: scope
    }

  it 'it should have name on scope', () ->
    expect(scope.name).toBe('AppCtrl')
