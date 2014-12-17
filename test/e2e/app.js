
/**
 Helpers
 */
var App, AppPage, LoginPage, RegisterPage, j$, loginPage, registerPage;

j$ = {
  el: function(selector) {
    return element(selector);
  },
  input: function(name) {
    return element("input[name='" + name + "']");
  }
};


/**
App Page
 */

AppPage = function() {
  return this.get = function() {
    return browser().navigateTo('/');
  };
};


/**
 Login Page
 */

LoginPage = function() {
  this.get = function() {
    return browser().navigateTo('/login');
  };
  return this.login = function() {
    input('user.email').enter('admin@email.com');
    input('user.password').enter('admin1234');
    return element('form button[type="submit"]', 'Click the Login submit button').click();
  };
};


/**
 Register Page
 */

RegisterPage = function() {
  var agree, email, password, password2, username;
  email = j$.input('email');
  username = j$.input('username');
  password = j$.input('password');
  password2 = j$.input('password2');
  agree = j$.input('agree');
  this.get = function() {
    return browser().navigateTo('/register');
  };
  return this.register = function() {
    email.enter('test@email.com');
    username.enter('test');
    password.enter('test');
    password2.enter('test');
    agree.click();
    return element('button[type="submit"]', 'Click the submit button').click();

    /**
    
     Karma e2e Tests
     */
  };
};

App = null;

registerPage = null;

loginPage = null;

describe("Angular-CMS App", function() {
  beforeEach(function() {
    return browser().navigateTo('/');
  });
  describe('Index:', function() {
    it("should display the main index view as default", function() {
      return expect(browser().location().path()).toEqual('/');
    });
    it('should have a .navbar-brand on the page', function() {
      return expect(element('.navbar-brand', 'Site title').count()).toEqual(1);
    });
    it('should have a .login-btn element with a link to the login page', function() {
      return expect(element('a[href="#/login"]', 'the Login link').count()).toEqual(1);
    });
    it('should have a .media element for a feature', function() {
      sleep(1);
      return expect(element('.media').count()).toBeGreaterThan(1);
    });
    return it('should have a jumbrotron element for feature title and body', function() {
      sleep(1);
      return expect(element('.jumbotron').count()).toEqual(1);
    });
  });

  /**
  Register - The user registration implementation
   */
  describe('Register: ', function() {
    beforeEach(function() {
      return browser().navigateTo('/register');
    });
    it('should have email and password inputs with a button to submit the form', function() {
      expect(browser().location().path()).toEqual('/register');
      expect(element('form', 'Login form').count()).toEqual(1);
      expect(element('input[name="email"]', 'Email input').count()).toEqual(1);
      expect(element('input[name="username"]', 'Username input').count()).toEqual(1);
      expect(element('input[name="password"]', 'Password input').count()).toEqual(2);
      return expect(element('button[type="submit"]', 'Submit button').count()).toEqual(1);
    });
    return it('should allow the user to create a new account', function() {
      registerPage = new RegisterPage();
      registerPage.register();
      expect(browser().location().path()).toEqual('/register');
      sleep(1);
      return expect(browser().location().path()).toEqual('/dashboard');
    });
  });

  /**
  	 Login - The user login implementation
   */
  describe('Login:', function() {
    beforeEach(function() {
      browser().navigateTo('/login');
      return element('a[href="#/login"]', 'Login button').click();
    });
    return it('should have Username and password inputs with a button to submit the form', function() {
      expect(browser().location().path()).toEqual('/login');
      expect(element('form', 'Login form').count()).toEqual(1);
      expect(element('input[name="username"]', 'Username input').count()).toEqual(1);
      expect(element('input[name="password"]', 'Password input').count()).toEqual(1);
      expect(element('button[type="submit"]', 'Submit button').count()).toEqual(1);
      loginPage = new LoginPage();
      loginPage.login();
      sleep(1);
      return expect(browser().location().path()).toEqual('/dashboard');
    });
  });
  return describe('Dashboard Story: viewing the dashboard...', function() {
    beforeEach(function() {
      LoginPage.login();
      return sleep(1);
    });
    return it('should have a link to the profile page', function() {
      expect(element('.widget', 'Widget Panel').count()).toEqual(2);
      expect(element('a[ng-href="#/profile"]', 'the Profile link').count()).toEqual(1);
      return expect(element('.cms-sidebar-nav', 'Sidebar nav').count()).toEqual(1);
    });
  });
});
