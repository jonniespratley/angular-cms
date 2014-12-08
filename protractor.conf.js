// An example configuration file.
exports.config = {
	// The address of a running selenium server.
	seleniumAddress: 'http://localhost:4444/wd/hub',
	params: {
		baseUrl: 'http://localhost:9000/#'
	},

	// Capabilities to be passed to the webdriver instance.
	capabilities: {
		'browserName': 'chrome'
	}
	,

// Spec patterns are relative to the current working directly when
// protractor is called.
	specs: [
		'.tmp/protractor/*.js',
		'test/protractor/*.js'
	],

	// Options to be passed to Jasmine-node.
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000
	},
	onPrepare: function () {
		var SpecReporter = require( 'jasmine-spec-reporter' );
		// add jasmine spec reporter
		jasmine.getEnv().addReporter( new SpecReporter( {displayStacktrace: true} ) );
	}
};
