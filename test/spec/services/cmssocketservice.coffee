'use strict'

describe 'Service: cmsSocketService', ->

  # load the service's module
  beforeEach module 'angularCmsApp'

  # instantiate service
  cmsSocketService = {}
  beforeEach inject (_cmsSocketService_) ->
    cmsSocketService = _cmsSocketService_

  it 'should do something', ->
    expect(!!cmsSocketService).toBe true
