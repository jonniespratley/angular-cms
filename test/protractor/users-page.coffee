###*
UsersPage - I handle actions on the users page
###
module.exports = UsersPage = ()->
  @newUserBtn = element(protractor.By.buttonText("New User"))
  @submitBtn = element(protractor.By.buttonText("Submit"))
  @inputs =
    email: element(protractor.By.model("user.email"))
    username: element(protractor.By.model("user.username"))
    password: element(protractor.By.model("user.password"))
    name: element(protractor.By.model("user.meta.name"))
    summary: element(protractor.By.model("user.meta.summary"))
  @get = ->
    browser.get '/#/users'
  @setForm = (email, username, password, name, summary) ->
    @newUserBtn.click()
    browser.sleep 500
    @inputs.username.sendKeys username
    @inputs.email.sendKeys email
    @inputs.password.sendKeys password
    @inputs.name.sendKeys name
    @inputs.summary.sendKeys summary
    @submitBtn.click()
    browser.sleep 1000
