'use strict'

describe 'Directive: cmsWidget', () ->

  # load the directive's module
  beforeEach module 'angularCmsApp'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  xit 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<cms-widget></cms-widget>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the cmsWidget directive'
