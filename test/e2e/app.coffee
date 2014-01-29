describe "Angular-CMS App", ->
	
	beforeEach ->
		browser().navigateTo('/')

	it "should display the main view as default", ->
		browser().navigateTo "/index.html"
		
		expect(browser().location().path()).toEqual '/'
	
	it 'should have a brand with angular-cms', ->
		expect(element('.navbar-brand', 'Sitetitle').text()).toEqual 'angular-cms'

	it 'should have a .login-btn element', ->
		expect(element('a[href="#/login"]', 'Login link').count()).toEqual 1

	describe 'Login Story: clicking the login element', ->
		it 'should navigate to /login and display a form', ->	
			element('a[href="#/login"]', 'Login button').click()
			sleep 2
			expect(browser().location().path()).toEqual '/login'		
			expect( element('.login form', 'Login form').count() ).toEqual 1	

		it 'should have username and password inputs and a button to sign in', ->
			browser().navigateTo('/login')
			input('user.username').enter 'jonniespratley'
			input('user.password').enter 'admin1234'
			element('.login form button', 'Login submit button').click()
			expect(browser().location().path()).toEqual '/dashboard'		