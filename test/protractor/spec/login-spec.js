var loginPage;

loginPage = require('../pages/login-page');


/**
 Login - The user login implementation
 */

describe('Login:', function() {
  beforeEach(function() {
    return loginPage.get();
  });
  afterEach(function() {
    return loginPage.logout();
  });
  return it('should allow a user to login', function() {
    return loginPage.login('test@gmail.com', 'test').then(function() {
      return expect(browser.getLocationAbsUrl()).toContain('/dashboard');
    });
  });
});
