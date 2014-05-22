###*
@ngdoc filter
@name angularCmsApp.filter:markdown
@function
 
@description
 This is a Markdown to HTML filter.
###
'use strict'

angular.module('angularCmsApp')
  .filter 'markdown', () ->
    (input) ->
      markdown.toHTML(input)
