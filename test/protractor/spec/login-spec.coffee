loginPage = require('../pages/login-page')

###*
 Login - The user login implementation
###
describe 'Login:', ->
  beforeEach ->
    $('[href="#/login"]').click()
  it 'should have Username and password inputs with a button to submit the form', ->
    loginPage.login('test@email.com', 'test').then(()->
      expect(browser.getLocationAbsUrl()).toContain '/dashboard'
    )
