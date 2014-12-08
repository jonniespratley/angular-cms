AppPage = require('./app-page')
UsersPage = require('./users-page')
LoginPage = require('./login-page')
RegisterPage = require('./register-page')

App = null
usersPage = null
registerPage = null
loginPage = null

###*
Protractor e2e Tests
###
describe "Angular-CMS App", ->
  beforeEach ->
    App = new AppPage()
		App.get()
	#Welome Story: the initial page
	describe 'Index:', ->
		it "should display the main index view as default", ->
			expect(browser.getCurrentUrl()).toEqual '/'

		it 'should have a .navbar-brand on the page', ->
			expect(j$.element('.navbar-brand', 'Site title').count()).toEqual 1

		it 'should have a .login-btn element with a link to the login page', ->
			expect(j$.element('a[href="#/login"]', 'the Login link').count()).toEqual 1

		it 'should have a .media element for a feature', ->
			browser.sleep 1
			expect(j$.element('.media').count()).toBeGreaterThan 1

		it 'should have a jumbrotron element for feature title and body', ->
			browser.sleep 1
			expect(j$.element('.jumbotron').count()).toEqual 1


	###*
  Register - The user registration implementation
  ###
	describe 'Register: ', ->
		it 'should have email and password inputs with a button to submit the form', ->
      registerPage = new RegisterPage()
      registerPage.get()
			expect(driver.getCurrentUrl()).toContain 'register'
			expect(j$.element('form', 'Login form').count()).toEqual 1
			expect(j$.element('input[name="email"]', 'Email input').count()).toEqual 1
			expect(j$.element('input[name="username"]', 'Username input').count()).toEqual 1
			expect(j$.element('input[name="password"]', 'Password input').count()).toEqual 2
			expect(j$.element('button[type="submit"]', 'Submit button').count()).toEqual 1

	###*
	 Login - The user login implementation
	###
	describe 'Login:', ->

		#Click the login button each time
		beforeEach ->
      loginPage = new LoginPage()
			element('a[href="#/login"]', 'Login button').click()

		#Make sure we end up at the login page to enter our credentials
		#Make sure there is a username and password input with button
		it 'should have Username and password inputs with a button to submit the form', ->
			expect(browser().location().path()).toEqual '/login'
			expect(element('form', 'Login form').count()).toEqual 1
			expect(element('input[name="username"]', 'Username input').count()).toEqual 1
			expect(element('input[name="password"]', 'Password input').count()).toEqual 1
			expect(element('button[type="submit"]', 'Submit button').count()).toEqual 1

			#Login to the page
			loginPage.login()

			#Wait for the api call to go thru
			sleep 1
			#We should end up at the dashboard page.
			expect(browser().location().path()).toEqual '/dashboard'

	#The dashboard implementation
	describe 'Dashboard: viewing the dashboard...', ->
		beforeEach ->
      loginPage = new LoginPage()
			loginPage.login('test@gmail.com', 'test')
			browser.sleep 1
		it 'should have a link to the profile page', ->
			expect(j$.element('.widget', 'Widget Panel').count()).toEqual 2
			expect(j$.element('a[ng-href="#/profile"]', 'the Profile link').count()).toEqual 1
			expect(j$.element('.cms-sidebar-nav', 'Sidebar nav').count()).toEqual 1

  describe "Users Page:", ->
    beforeEach ->
      usersPage = new UsersPage()
      usersPage.get()
    it "should be able to create a new user", ->
      username = "protractor" + Date.now()
      usersPage.setForm username + "@test.com", username, "test", "John Doe", "This is an example user."

#The user registration implementation


#The user forgot password implementation


# The CRUD operations on DB implementation


# User table


#User form
