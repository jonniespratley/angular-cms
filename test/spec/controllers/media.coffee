'use strict'

describe 'Controller: MediaCtrl', () ->

  # load the controller's module
  beforeEach module 'angularCmsApp'

  MediaCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    MediaCtrl = $controller 'MediaCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', () ->
    expect(scope.awesomeThings.length).toBe 3
