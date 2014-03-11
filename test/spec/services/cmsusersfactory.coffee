'use strict'

describe 'Service: cmsUsersFactory', () ->

  # load the service's module
  beforeEach module 'angularCmsApp'

  # instantiate service
  cmsUsersFactory = {}
  beforeEach inject (_cmsUsersFactory_) ->
    cmsUsersFactory = _cmsUsersFactory_

  it 'should do something', () ->
    expect(!!cmsUsersFactory).toBe true
