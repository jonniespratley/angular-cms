
/**
UsersPage - I handle actions on the users page
 */
var UsersPage;

module.exports = UsersPage = function() {
  this.newUserBtn = element(protractor.By.buttonText("New User"));
  this.submitBtn = element(protractor.By.buttonText("Submit"));
  this.inputs = {
    email: element(protractor.By.model("user.email")),
    username: element(protractor.By.model("user.username")),
    password: element(protractor.By.model("user.password")),
    name: element(protractor.By.model("user.meta.name")),
    summary: element(protractor.By.model("user.meta.summary"))
  };
  this.get = function() {
    return browser.get('/#/users');
  };
  return this.setForm = function(email, username, password, name, summary) {
    this.newUserBtn.click();
    browser.sleep(500);
    this.inputs.username.sendKeys(username);
    this.inputs.email.sendKeys(email);
    this.inputs.password.sendKeys(password);
    this.inputs.name.sendKeys(name);
    this.inputs.summary.sendKeys(summary);
    this.submitBtn.click();
    return browser.sleep(1000);
  };
};
