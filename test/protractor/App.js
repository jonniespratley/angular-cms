
/*
 App.coffee

 This is the protractor spec that will test the different areas of the application.
 */
var UsersPage;

UsersPage = function() {

	this.newUserBtn = element(by.buttonText('New User'));


	this.emailInput = element(protractor.By.model('user.email'));
	this.usernameInput = element(protractor.By.model('user.username'));
	this.passwordInput = element(protractor.By.model('user.password'));
	this.nameInput = element(protractor.By.model('user.meta.name'));
	this.summaryInput = element(protractor.By.model('user.meta.summary'));
	this.submitBtn = element(by.buttonText('Submit'));

	this.get = function() {
		browser.get('http://localhost:9000/#/users');
	};
	this.setForm = function(email, username, password, name, summary) {
		this.newUserBtn.click();
		browser.sleep(1000);
		this.emailInput.sendKeys(email);
		this.usernameInput.sendKeys(username);
		this.passwordInput.sendKeys(password);
		this.nameInput.sendKeys(name);
		this.summaryInput.sendKeys(summary);

		this.submitBtn.click();
		browser.sleep(1000);
	};

};

describe('Angular-CMS', function() {
	var usersPage = null;
	describe('Users Page', function() {
		beforeEach(function() {
			usersPage = new UsersPage();
			usersPage.get();
		});
		it('should be able to create a new user', function() {
			usersPage.setForm('test@test.com', 'test', 'test', 'test', 'test');
		});
	});
});
