
###*
App Page - I handle general actions in the app.
###
module.exports = AppPage = () ->
  @get = ->
    browser.get '/'
