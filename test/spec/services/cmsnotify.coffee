'use strict'

describe 'Service: cmsNotify', () ->

  # load the service's module
  beforeEach module 'angularCmsApp'

  # instantiate service
  cmsNotify = {}
  beforeEach inject (_cmsNotify_) ->
    cmsNotify = _cmsNotify_

  it 'should do something', () ->
    expect(!! cmsNotify).toBe true
