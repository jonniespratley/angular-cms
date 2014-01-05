'use strict'

describe 'Controller: ProfileCtrl', () ->

  # load the controller's module
  beforeEach module 'angularCmsApp'

  ProfileCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    ProfileCtrl = $controller 'ProfileCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', () ->
    expect(scope.awesomeThings.length).toBe 3
