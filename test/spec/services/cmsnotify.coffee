'use strict'

describe 'Service: Cmsnotify', () ->

  # load the service's module
  beforeEach module 'angularCmsApp'

  # instantiate service
  Cmsnotify = {}
  beforeEach inject (_Cmsnotify_) ->
    Cmsnotify = _Cmsnotify_

  it 'should do something', () ->
    expect(!!Cmsnotify).toBe true
