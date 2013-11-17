'use strict'

describe 'Filter: markdown', () ->

  # load the filter's module
  beforeEach module 'angularCmsBaseApp'

  # initialize a new instance of the filter before each test
  markdown = {}
  beforeEach inject ($filter) ->
    markdown = $filter 'markdown'

  it 'should return the input prefixed with "markdown filter:"', () ->
    text = 'angularjs'
    expect(markdown text).toBe ('markdown filter: ' + text)
