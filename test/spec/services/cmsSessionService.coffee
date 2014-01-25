'use strict'

describe 'Service: cmsSessionService', () ->

  # load the service's module
  beforeEach module 'angularCmsApp'
		# instantiate service
		cmsSessionService = {}

	beforeEach inject (_cmsSessionService_) ->
		cmsSessionService = _cmsSessionService_

  it 'should do something', () ->
    expect(!!cmsSessionService).toBe true
