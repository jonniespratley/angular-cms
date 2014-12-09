AppPage = require('../pages/app-page')


###*
Protractor e2e Tests
###
App = new AppPage()
describe "Angular-CMS App", ->
  beforeEach ->
    App.get()

	#Welome Story: the initial page
	describe 'Index:', ->
		it "should display the main index view as default", ->
			expect(browser.getLocationAbsUrl()).toEqual '/'
