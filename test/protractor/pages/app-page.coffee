###*
App Page - I handle general actions in the app.
###
AppPage =
	title: $('.navbar-brand')
	get: ->
		browser.get '/#'
	refresh: ->
		browser.refresh()

module.exports = AppPage
