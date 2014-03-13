'use strict'

angular.module('angularCmsApp').filter 'gravatar', () ->
	(input) ->
		'http://www.gravatar.com/avatar/' + MD5(input) if input
