loginPage = require('../pages/login-page')

###*
 Login - The user login implementation
###
describe 'Login:', ->
	beforeEach ->
		loginPage.get()
	afterEach ->
		loginPage.logout()
	it 'should have Username and password inputs with a button to submit the form', ->
		loginPage.login('test@email.com', 'test').then(()->
			expect(browser.getLocationAbsUrl()).toContain '/dashboard'
		)
