'use strict'

describe 'Filter: gravatar', () ->

  # load the filter's module
  beforeEach module 'angularCmsApp'

  # initialize a new instance of the filter before each test
  gravatar = {}
  beforeEach inject ($filter) ->
    gravatar = $filter 'gravatar'

  it 'should return the input prefixed with "gravatar filter:"', () ->
    text = 'angularjs'
    expect(gravatar text).toBe ('gravatar filter: ' + text)
