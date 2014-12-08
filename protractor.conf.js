
// An example configuration file.
exports.config = {
	baseUrl: 'http://127.0.0.1:9000',
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',
	// ---- 3. To use remote browsers via Sauce Labs -----------------------------
  // If sauceUser and sauceKey are specified, seleniumServerJar will be ignored.
  // The tests will be run remotely using Sauce Labs.
  //sauceUser: SAUCE_USERNAME,
  //sauceKey: SAUCE_ACCESS_KEY,
  // Use sauceSeleniumAddress if you need to customize the URL Protractor
  // uses to connect to sauce labs (for example, if you are tunneling selenium
  // traffic through a sauce connect tunnel). Default is
  //sauceSeleniumAddress: 'http://localhost:4445/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
		'name': 'AngularCMS',
    'browserName': 'chrome',
		'chromeOptions': {
    	'args': ['show-fps-counter=true']
  	}
  },

	params: {
		baseUrl: 'http://127.0.0.1:9000'
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
	}
};
