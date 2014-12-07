// An example configuration file.
exports.config = {
	baseUrl: 'http://localhost:9000',
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

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
	}
};
