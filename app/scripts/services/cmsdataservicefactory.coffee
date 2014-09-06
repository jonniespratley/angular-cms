###*
@ngdoc service
@name angularCmsApp.service:cmsDataServiceFactory
@function
@description
This is the description.
###
'use strict'
angular.module('angularCmsApp')
  .factory 'cmsDataServiceFactory', () ->
    # Service logic
    # ...

    meaningOfLife = 42

    # Public API here
    {
      someMethod: () ->
        meaningOfLife
    }
