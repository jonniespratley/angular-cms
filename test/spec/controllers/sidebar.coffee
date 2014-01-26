'use strict'

describe 'Controller: SidebarCtrl', () ->

  # load the controller's module
  beforeEach module 'angularCmsApp'

  SidebarCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    SidebarCtrl = $controller 'SidebarCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', () ->
    expect(scope.awesomeThings.length).toBe 3
