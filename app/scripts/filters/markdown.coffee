'use strict'

angular.module('angularCmsApp')
  .filter 'markdown', () ->
    (input) ->
      markdown.toHTML(input)
