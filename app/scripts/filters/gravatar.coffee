###*
@ngdoc filter
@name angularCmsApp.filter:gravatar
@function
 
@description
 This is the Gravatar filter that takes a users email and create the proper MD5 hash.
###
'use strict'
angular.module('angularCmsApp').filter 'gravatar', () ->
	(input) ->
		input = 'test@gmail.com' unless input
		'http://www.gravatar.com/avatar/' + MD5(input)
