var registerPage, testEmail;

registerPage = require('../pages/register-page');


/**
Register - The user registration implementation
 */

testEmail = Date.now() + '-test@email.com';

describe('Register: ', function() {
  return it('should allow a user to register', function() {
    registerPage.get();
    expect(browser.getCurrentUrl()).toContain('register');
    return registerPage.register(testEmail, 'test').then(function() {
      return expect(browser.getCurrentUrl()).toContain('dashboard');
    });
  });
});
