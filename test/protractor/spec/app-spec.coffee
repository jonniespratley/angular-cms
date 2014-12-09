appPage = require('../pages/app-page')


###*
Protractor e2e Tests
###

describe "Angular-CMS App", ->
  beforeEach ->
    appPage.refresh()
  it 'should have the correct title', ->
    appPage.title.getText().then((val)->
      expect(val).toContain('angular-cms')
    )
