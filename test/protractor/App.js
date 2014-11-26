
/*
 App.coffee

 This is the protractor spec that will test the different areas of the application.
 */

var UsersPage = function() {

	this.newUserBtn = element(by.buttonText('New User'));
	this.submitBtn = element(by.buttonText('Submit'));

	this.inputs = {
		email: element(protractor.By.model('user.email')),
		username: element(protractor.By.model('user.username')),
		password: element(protractor.By.model('user.password')),
		name: element(protractor.By.model('user.meta.name')),
		summary: element(protractor.By.model('user.meta.summary'))
	};

	this.get = function() {
		browser.get('http://localhost:9000/#/users');
	};

	this.setForm = function(email, username, password, name, summary) {
		this.newUserBtn.click();
		browser.sleep(500);
		this.inputs.username.sendKeys(username);
		this.inputs.email.sendKeys(email);
		this.inputs.password.sendKeys(password);
		this.inputs.name.sendKeys(name);
		this.inputs.summary.sendKeys(summary);

		this.submitBtn.click();
		browser.sleep(1000);
	};

};

describe('Angular-CMS', function() {
	var usersPage = null;

	describe('Users Page:', function() {
		beforeEach(function() {
			usersPage = new UsersPage();
			usersPage.get();
		});

		it('should be able to create a new user', function() {
			var username = 'protractor' + Date.now();
			usersPage.setForm(username+'@test.com', username, 'test', 'John Doe', 'This is an example user.');
		});
	});
});
