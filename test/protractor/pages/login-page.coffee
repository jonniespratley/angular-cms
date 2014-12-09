###*
 Login Page - I handle actions on the login page.
###
LoginPage =
  username: $('#username')
  password: $('#password')
  get: ->
    browser.get '/login'
  login: (u, p) ->
    @username.sendKeys(u)
    @password.sendKeys(p)
    element(protractor.By.css('button[type="submit"]')).click()

module.exports = LoginPage
