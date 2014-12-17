
/**
 Login Page - I handle actions on the login page.
 */
var LoginPage;

LoginPage = {
  username: $('#username'),
  password: $('#password'),
  get: function() {
    return browser.get('#/login');
  },
  logout: function() {
    return $('.dropdown-toggle').getWebElement().then(function(el) {
      return el.click().then(function() {
        return $('[href="#/login"]').click();
      });
    });
  },
  login: function(u, p) {
    this.username.sendKeys(u);
    this.password.sendKeys(p);
    return element(protractor.By.css('button[type="submit"]')).click();
  }
};

module.exports = LoginPage;
