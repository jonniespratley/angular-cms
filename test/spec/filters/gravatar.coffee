'use strict'

describe 'Filter: gravatar', () ->

  # load the filter's module
  beforeEach module 'angularCmsApp'

  # initialize a new instance of the filter before each test
  gravatar = {}
  beforeEach inject ($filter) ->
    gravatar = $filter 'gravatar'

  it 'should return the hashed url', () ->
    text = 'jonniespratley@gmail.com'
    expect(gravatar(text)).toBe('http://www.gravatar.com/avatar/f6112e781842d6a2b4636b35451401ff')
