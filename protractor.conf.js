// An example configuration file.
exports.config = {
	baseUrl: 'http://localhost:9000',
  // The address of a running selenium server.
  //seleniumAddress: 'http://localhost:4444/wd/hub',
	// ---- 3. To use remote browsers via Sauce Labs -----------------------------
  // If sauceUser and sauceKey are specified, seleniumServerJar will be ignored.
  // The tests will be run remotely using Sauce Labs.
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  // Use sauceSeleniumAddress if you need to customize the URL Protractor
  // uses to connect to sauce labs (for example, if you are tunneling selenium
  // traffic through a sauce connect tunnel). Default is
  sauceSeleniumAddress: 'ondemand.saucelabs.com:80/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

	params: {
		baseUrl: 'http://localhost:9000'
	},

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: [
	  '.tmp/protractor/*-spec.js',
	  'test/protractor/*-spec.js'
  ],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },
	onPrepare: function(){
		browser.driver.get(browser.params.baseUrl);

		var SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
	},
	onComplete: function () {
		browser.driver.close();
	}
};
