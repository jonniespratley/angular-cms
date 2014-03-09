'use strict'

describe 'Directive: cmsHeader', () ->

  # load the directive's module
  beforeEach module 'angularCmsApp'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<cms-header></cms-header>'
    element = $compile(element) scope
    #expect(element.text()).toBe 'this is the cmsHeader directive'
