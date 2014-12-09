###*
 J$ Helpers - I am test helpers
###
module.exports =
	element: (selector, label) ->
		console.warn('finding', label) if label
		$(selector)
	input: (name) ->
		element(protractor.By.css("[name=#{name}]")).getWebElement()