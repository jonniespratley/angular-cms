
/**
 J$ Helpers - I am test helpers
 */
module.exports = {
  element: function(selector, label) {
    if (label) {
      console.warn('finding', label);
    }
    return $(selector);
  },
  input: function(name) {
    return element(protractor.By.css("[name=" + name + "]")).getWebElement();
  }
};
