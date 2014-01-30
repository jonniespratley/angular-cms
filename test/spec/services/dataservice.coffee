'use strict'

describe 'Service: DataService', () ->

  # load the service's module
  beforeEach module 'angularCmsApp'

  # instantiate service
  DataService = {}
  beforeEach inject (_DataService_) ->
    DataService = _DataService_

  it 'should do something', () ->
    expect(!!DataService).toBe true
