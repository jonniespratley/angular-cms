###*
 Register Page - I handle actions on the register page
###
module.exports = RegisterPage = () ->
  email = j$.input('email')
  username = j$.input('username')
  password = j$.input('password')
  password2 = j$.input('password2')
  agree = j$.input('agree')
  @get = ->
    browser.get '/#/register'
  @register = ->
    email.sendKeys('test@email.com')
    username.sendKeys('test')
    password.sendKeys('test')
    password2.sendKeys('test')
    agree.click()
    element(protractor.By.css('button[type="submit"]')).click()
