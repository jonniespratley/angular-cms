###*
 Login Page - I handle actions on the login page.
###
LoginPage =
	username: $('#username')
	password: $('#password')
	get: ->
		browser.get '#/login'
	logout: ->
		$('.dropdown-toggle').getWebElement().then((el)->
			el.click().then(()->
				$('[href="#/login"]').click()
			)
		)
	login: (u, p) ->
		@username.sendKeys(u)
		@password.sendKeys(p)
		element(protractor.By.css('button[type="submit"]')).click()

module.exports = LoginPage
