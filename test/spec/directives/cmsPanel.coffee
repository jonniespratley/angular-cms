'use strict'

describe 'Directive: cmsPanel', () ->

  # load the directive's module
  beforeEach module 'angularCmsApp'

  scope = 
  	title: 'Test'

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  xit 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<cms-panel>this is the cmsPanel directive</cms-panel>'
    element = $compile(element) scope
    expect(element.text()).toBe 'Test'
