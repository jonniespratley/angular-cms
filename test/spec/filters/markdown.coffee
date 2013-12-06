'use strict'

describe 'Filter: markdown', () ->

  # load the filter's module
  beforeEach module 'angularCmsApp'

  # initialize a new instance of the filter before each test
  markdown = {}
  beforeEach inject ($filter) ->
    markdown = $filter 'markdown'

  it 'should return the input prefixed with "markdown filter:"', () ->
    text = '#H1'
    #expect(markdown text).toBe ('<h1>H1</h1>')
