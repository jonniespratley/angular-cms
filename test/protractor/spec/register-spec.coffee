RegisterPage = require('../pages/register-page')
j$ = require('../j$')

###*
Register - The user registration implementation
###
describe 'Register: ', ->
  it 'should have email and password inputs with a button to submit the form', ->
    registerPage = new RegisterPage()
    registerPage.get()
    expect(browser.getCurrentUrl()).toContain 'register'
    expect(j$.element('form', 'Login form').count()).toEqual 1
    expect(j$.element('input[name="email"]', 'Email input').count()).toEqual 1
    expect(j$.element('input[name="username"]', 'Username input').count()).toEqual 1
    expect(j$.element('input[name="password"]', 'Password input').count()).toEqual 2
    expect(j$.element('button[type="submit"]', 'Submit button').count()).toEqual 1
