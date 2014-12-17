'submit form': function () {
  return this.remote
  .get('/login')
  .findById('username')
  .click()
  .type('test@gmail.com')
  .end()
  .findById('password')
  .click()
  .type('test')
  .end()
  .findById('submit')
  .click()
  .end()
  .setFindTimeout(Infinity)
  .findById('#account')
  .setFindTimeout(0)
  .text()
  .then(function (resultText) {
    assert.ok(resultText.indexOf(
      'email') > -1,
      'test@gmail.com');
    });
  }
