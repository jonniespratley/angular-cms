'use strict'

describe 'Directive: cmsGravatar', () ->

  # load the directive's module
  beforeEach module 'angularCmsApp'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<cms-gravatar></cms-gravatar>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the cmsGravatar directive'
