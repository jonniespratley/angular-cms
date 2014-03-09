'use strict'

describe 'Service: cmsDataServiceProvider', () ->

  # load the service's module
  beforeEach module 'angularCmsApp'

  # instantiate service
  cmsDataServiceProvider = {}
  beforeEach inject (_cmsDataServiceProvider_) ->
    cmsDataServiceProvider = _cmsDataServiceProvider_

  it 'should do something', () ->
    expect(!!cmsDataServiceProvider).toBe true
