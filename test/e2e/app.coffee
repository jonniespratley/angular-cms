###*
 Helpers
###

j$ =
	el: (selector) ->
		element(selector)
	input: (name) ->
		element("input[name='#{name}']")


###*
App Page
###
AppPage = () ->
	@get = ->
		browser().navigateTo('/')

###*
 Login Page
###
LoginPage = () ->
	@get = ->
		browser().navigateTo('/login')

	@login = ->
		#element('a[href="#/login"]', 'Login button').click()
		#Enter the test credentials
		input('user.email').enter('admin@email.com')
		input('user.password').enter('admin1234')
		element('form button[type="submit"]', 'Click the Login submit button').click()


###*
 Register Page
###
RegisterPage = () ->
	email = j$.input('email')
	username = j$.input('username')
	password = j$.input('password')
	password2 = j$.input('password2')
	agree = j$.input('agree')

	@get = ->
		browser().navigateTo('/register')

	@register = ->
		email.enter('test@email.com')
		username.enter('test')
		password.enter('test')
		password2.enter('test')
		agree.click()
		element('button[type="submit"]', 'Click the submit button').click()


		###*

 Karma e2e Tests


 ###
App = null
registerPage = null
loginPage = null

describe "Angular-CMS App", ->
	beforeEach ->
		browser().navigateTo('/')

	#Welome Story: the initial page
	describe 'Index:', ->
		it "should display the main index view as default", ->
			expect(browser().location().path()).toEqual '/'

		it 'should have a .navbar-brand on the page', ->
			expect(element('.navbar-brand', 'Site title').count()).toEqual 1

		it 'should have a .login-btn element with a link to the login page', ->
			expect(element('a[href="#/login"]', 'the Login link').count()).toEqual 1

		it 'should have a .media element for a feature', ->
			sleep 1
			expect(element('.media').count()).toBeGreaterThan 1

		it 'should have a jumbrotron element for feature title and body', ->
			sleep 1
			expect(element('.jumbotron').count()).toEqual 1


	###*
Register - The user registration implementation
###
	describe 'Register: ', ->
		beforeEach ->
			browser().navigateTo('/register')

		it 'should have email and password inputs with a button to submit the form', ->
			expect(browser().location().path()).toEqual '/register'
			expect(element('form', 'Login form').count()).toEqual 1
			expect(element('input[name="email"]', 'Email input').count()).toEqual 1
			expect(element('input[name="username"]', 'Username input').count()).toEqual 1
			expect(element('input[name="password"]', 'Password input').count()).toEqual 2
			expect(element('button[type="submit"]', 'Submit button').count()).toEqual 1

		it 'should allow the user to create a new account', ->
			registerPage = new RegisterPage()
			registerPage.register()
			expect(browser().location().path()).toEqual '/register'
			sleep 1
			expect(browser().location().path()).toEqual '/dashboard'


	###*
	 Login - The user login implementation
	###
	describe 'Login:', ->

		#Click the login button each time
		beforeEach ->
			browser().navigateTo('/login')
			element('a[href="#/login"]', 'Login button').click()

		#Make sure we end up at the login page to enter our credentials
		#Make sure there is a username and password input with button
		it 'should have Username and password inputs with a button to submit the form', ->
			expect(browser().location().path()).toEqual '/login'
			expect(element('form', 'Login form').count()).toEqual 1
			expect(element('input[name="username"]', 'Username input').count()).toEqual 1
			expect(element('input[name="password"]', 'Password input').count()).toEqual 1
			expect(element('button[type="submit"]', 'Submit button').count()).toEqual 1

			loginPage = new LoginPage()
			#Login to the page
			loginPage.login()

			#Wait for the api call to go thru
			sleep 1

			#We should end up at the dashboard page.
			expect(browser().location().path()).toEqual '/dashboard'

	#The dashboard implementation
	describe 'Dashboard Story: viewing the dashboard...', ->
		beforeEach ->
			LoginPage.login()
			sleep 1

		#Profile page
		it 'should have a link to the profile page', ->
			expect(element('.widget', 'Widget Panel').count()).toEqual 2
			expect(element('a[ng-href="#/profile"]', 'the Profile link').count()).toEqual 1
			expect(element('.cms-sidebar-nav', 'Sidebar nav').count()).toEqual 1


#The user registration implementation


#The user forgot password implementation


# The CRUD operations on DB implementation


# User table


#User form


#
