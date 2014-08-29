###*
@ngdoc service
@name angularCmsApp.service:cmsNotify
@function
@description
This is the description.
###
'use strict'
angular.module('angularCmsApp').factory('cmsNotify', ['$timeout', '$q', ($timeout, $q) ->
	notices = []
	#Simple alert function to display a notice
	notify = (el, type, title, msg, timeout) ->
		notices.push(type: type, title: title, msg: msg)
		alert = """
		<div class="alert alert-#{type} alert-dismissable"> 
			<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> 
			<strong>#{title}</strong> #{msg}
		</div>
		"""
		#Append to content
		if el
			angular.element(el).prepend(alert)
		else 
			angular.element('.container').prepend(alert)
		
		#If timeout
		if timeout
			$timeout(()-> 
				angular.element('.alert').fadeOut().remove()
			, 
			timeout
			)
	return notify
])