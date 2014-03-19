'use strict'

describe 'Service: cmsAuthService', () ->

  # load the service's module
  beforeEach module 'angularCmsApp'

  # instantiate service
  cmsAuthService = {}
  beforeEach inject (_cmsAuthService_) ->
    cmsAuthService = _cmsAuthService_

  it 'should do something', () ->
    expect(!! cmsAuthService).toBe true
