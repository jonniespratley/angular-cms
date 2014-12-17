
/**
Protractor e2e Tests
 */
describe('Angular-CMS App', function() {
  var appPage;
  appPage = require('../pages/app-page');
  return it('should have the correct title', function() {
    return appPage.title.getText().then(function(val) {
      return expect(val).toContain('angular-cms');
    });
  });
});
