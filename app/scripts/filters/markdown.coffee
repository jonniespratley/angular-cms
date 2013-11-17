'use strict'

angular.module('angularCmsBaseApp')
  .filter 'markdown', () ->
    (input) ->
      markdown.toHTML(input)
