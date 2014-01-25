'use strict'

describe 'Directive: cmsWidgets', () ->

  # load the directive's module
  beforeEach module 'angularCmsApp'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  xit 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<cms-widgets></cms-widgets>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the cmsWidgets directive'
