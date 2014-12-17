var RegisterPage, j$;

j$ = require('../j$');


/**
 Register Page - I handle actions on the register page
 */

RegisterPage = {
  email: $('#email'),
  username: $('#username'),
  password: $('#password'),
  password2: $('#password2'),
  agree: $('#agree'),
  submit: element(protractor.By.buttonText('Sign up')),
  get: function() {
    return browser.get('#/register');
  },
  register: function(username, password) {
    this.email.sendKeys(username);
    this.username.sendKeys(username);
    this.password.sendKeys(password);
    this.password2.sendKeys(password);
    return this.agree.click().then((function(_this) {
      return function() {
        return _this.submit.click();
      };
    })(this));
  }
};

module.exports = RegisterPage;
