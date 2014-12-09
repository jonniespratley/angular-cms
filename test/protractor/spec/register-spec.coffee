registerPage = require('../pages/register-page')

###*
Register - The user registration implementation
###
testEmail = Date.now() + '-test@email.com'
describe 'Register: ', ->
  it 'should allow a user to register', ->
    registerPage.get()
    expect(browser.getCurrentUrl()).toContain 'register'
    registerPage.register(testEmail, 'test').then(()->
      expect(browser.getCurrentUrl()).toContain 'dashboard'  
    )
