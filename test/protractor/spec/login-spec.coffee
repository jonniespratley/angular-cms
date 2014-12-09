loginPage = require('../pages/login-page')

###*
 Login - The user login implementation
###
describe 'Login:', ->
	beforeEach ->
		loginPage.get()
	afterEach ->
		loginPage.logout()
	it 'should allow a user to login', ->
		loginPage.login('test@email.com', 'test').then(()->
			expect(browser.getLocationAbsUrl()).toContain '/dashboard'
		)
