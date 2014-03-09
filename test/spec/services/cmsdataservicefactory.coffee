'use strict'

describe 'Service: cmsDataServiceFactory', () ->

  # load the service's module
  beforeEach module 'angularCmsApp'

  # instantiate service
  cmsDataServiceFactory = {}
  beforeEach inject (_cmsDataServiceFactory_) ->
    cmsDataServiceFactory = _cmsDataServiceFactory_

  it 'should do something', () ->
    expect(!!cmsDataServiceFactory).toBe true
