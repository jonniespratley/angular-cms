'use strict'

describe 'Service: Cmssessionservice', () ->

  # load the service's module
  beforeEach module 'angularCmsApp'

  # instantiate service
  Cmssessionservice = {}
  beforeEach inject (_Cmssessionservice_) ->
    Cmssessionservice = _Cmssessionservice_

  it 'should do something', () ->
    expect(!!Cmssessionservice).toBe true
