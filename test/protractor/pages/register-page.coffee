j$ = require('../j$')

###*
 Register Page - I handle actions on the register page
###
RegisterPage =
  email = $('#email')
  username: $('#username')
  password: $('#password')
  password2: $('#password2')
  agree: $('#agree')
  submit: element(protractor.By.css('button'))
  get: ->
    browser.get '/register'
  register: (username, password) ->
    @email.sendKeys(username)
    @username.sendKeys(username)
    @password.sendKeys(password)
    @password2.sendKeys(password)
    @agree.click()
    @submit.click()

module.exports = RegisterPage
