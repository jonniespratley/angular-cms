
/**
App Page - I handle general actions in the app.
 */
var AppPage;

AppPage = {
  title: $('.navbar-brand'),
  get: function() {
    return browser.get('/#');
  },
  refresh: function() {
    return browser.refresh();
  }
};

module.exports = AppPage;
