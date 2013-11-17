'use strict'

describe 'Directive: cmsPanel', () ->

  # load the directive's module
  beforeEach module 'angularCmsBaseApp'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<cms-panel></cms-panel>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the cmsPanel directive'
