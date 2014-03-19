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
