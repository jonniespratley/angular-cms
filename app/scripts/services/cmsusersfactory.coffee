###*
@ngdoc service
@name angularCmsApp.service:cmsUsersFactory
@function
 
@description
 This is the UsersFactory.
###
'use strict'

angular.module('angularCmsApp')
  .factory 'cmsUsersFactory', () ->
    # Service logic
    # ...

    meaningOfLife = 42

    # Public API here
    {
      someMethod: () ->
        meaningOfLife
    }
