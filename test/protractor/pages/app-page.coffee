
###*
App Page - I handle general actions in the app.
###
AppPage =
  title: $('.navbar-brand')
  get: ->
    browser.get '/'

module.exports = AppPage
