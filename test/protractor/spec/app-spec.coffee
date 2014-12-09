###*
Protractor e2e Tests
###

describe 'Angular-CMS App', ->
	appPage = require('../pages/app-page')
	it 'should have the correct title', ->
		appPage.title.getText().then((val)->
			expect(val).toContain('angular-cms')
		)
