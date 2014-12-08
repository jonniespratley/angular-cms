###*
 Login Page - I handle actions on the login page.
###
module.exports = LoginPage = () ->
  @get = ->
    browser.get '/#/login'
  @login = (u, p) ->
    j$.input('username').sendKeys(u)
    j$.input('password').sendKeys(p)
    j$.element('button[type="submit"]').click()
