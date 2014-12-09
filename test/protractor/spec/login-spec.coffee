LoginPage = require('../pages/login-page')
loginPage = new LoginPage()
###*
 Login - The user login implementation
###
describe 'Login:', ->

  #Click the login button each time
  beforeEach ->
    $('a[href="#/login"]').click()

  #Make sure we end up at the login page to enter our credentials
  #Make sure there is a username and password input with button
  it 'should have Username and password inputs with a button to submit the form', ->
    expect(browser.getLocationAbsUrl()).toEqual '/login'

    #Login to the page
    loginPage.login('test@email.com', 'test')

    #Wait for the api call to go thru
    sleep 1

    #We should end up at the dashboard page.
    expect(browser.getLocationAbsUrl()).toEqual '/dashboard'
