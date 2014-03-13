'use strict'

angular.module('angularCmsApp').filter 'gravatar', () ->
	(input) ->
		input = 'test@gmail.com' unless input
		'http://www.gravatar.com/avatar/' + MD5(input)
