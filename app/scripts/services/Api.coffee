'use strict';

angular.module('angularCmsApp')
  .factory 'Api', () ->
    # Service logic
    # ...

    meaningOfLife = 42

    # Public API here
    {
      someMethod: () ->
        return meaningOfLife;
    }
