// Learn more about configuring this file at <https://github.com/theintern/intern/wiki/Configuring-Intern>.
// These default settings work OK for most people. The options that *must* be changed below are the
// packages, suites, excludeInstrumentation, and (if you want functional tests) functionalSuites.
/*
SAUCE_USERNAME=jonniespratleyge SAUCE_ACCESS_KEY=66f8830c-ec8f-441c-8f06-e8947d830a90 ./node_modules/.bin/intern-runner config=tests/intern
*/

define({
	//sauce connect
	tunnelOptions: {
		username: 'jonniespratleyge',
		accessKey: '66f8830c-ec8f-441c-8f06-e8947d830a90'
	},
	// The port on which the instrumenting proxy will listen
	proxyPort: 9900,

	// A fully qualified URL to the Intern proxy
	proxyUrl: 'http://localhost:9900/',

	// Default desired capabilities for all environments. Individual capabilities can be overridden by any of the
	// specified browser environments in the `environments` array below as well. See
	// https://code.google.com/p/selenium/wiki/DesiredCapabilities for standard Selenium capabilities and
	// https://saucelabs.com/docs/additional-config#desired-capabilities for Sauce Labs capabilities.
	// Note that the `build` capability will be filled in with the current commit ID from the Travis CI environment
	// automatically
	capabilities: {
		'selenium-version': '2.41.0'
	},

	// Browsers to run integration testing against. Note that version numbers must be strings if used with Sauce
	// OnDemand. Options that will be permutated are browserName, version, platform, and platformVersion; any other
	// capabilities options specified for an environment will be copied as-is
	environments: [
		{browserName: 'chrome'}
	],

	// Maximum number of simultaneous integration tests that should be executed on the remote WebDriver service
	maxConcurrency: 3,

	// Name of the tunnel class to use for WebDriver tests
	tunnel: 'SauceLabsTunnel',

	// The desired AMD loader to use when running unit tests (client.html/client.js). Omit to use the default Dojo
	// loader
	useLoader: {
		'host-node': 'dojo/dojo',
		'host-browser': 'node_modules/dojo/dojo.js',
		'supertest': 'node_modules/supertest/index.js',
		'request': 'node_modules/request/index.js'
	},

	// Configuration options for the module loader; any AMD configuration options supported by the specified AMD loader
	// can be used here
	loader: {
		// Packages that should be registered with the loader in each testing environment
		packages: [
			{ name: 'myPackage', location: '.' }
		]
	},

	// Non-functional test suite(s) to run in each browser
	suites: [
		'test/routes/cms-auth-spec',
		'test/routes/cms-passport-spec',
		'test/routes/cms-proxy-spec',
		'test/routes/cms-rest-spec',
		'test/routes/cms-server-spec',
		'test/routes/cms-sockets-spec',
		'test/routes/cms-upload-spec'
		/* 'myPackage/tests/foo',
		'myPackage/tests/bar' */
	],

	// Functional test suite(s) to run in each browser once non-functional tests are completed
	functionalSuites: [
	//'tests/functional/index'
	 /* 'myPackage/tests/functional' */ ],

	// A regular expression matching URLs to files that should not be included in code coverage analysis
	excludeInstrumentation: /^(?:tests|node_modules|app\/bower_components|www|config|bin)\//
});
