'use strict'

describe 'Service: Cmsauthservice', () ->

  # load the service's module
  beforeEach module 'angularCmsApp'

  # instantiate service
  Cmsauthservice = {}
  beforeEach inject (_Cmsauthservice_) ->
    Cmsauthservice = _Cmsauthservice_

  it 'should do something', () ->
    expect(!!Cmsauthservice).toBe true
