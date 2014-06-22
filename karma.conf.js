// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
	config.set({
		// base path, that will be used to resolve files and exclude
		basePath : '.',

		// testing framework to use (jasmine/mocha/qunit/...)
		frameworks : ['jasmine'],

		// list of files / patterns to load in the browser
		files : ['app/bower_components/jquery/jquery.js', 'app/bower_components/angular/angular.js', 'app/bower_components/angular-animate/angular-animate.js', 'app/bower_components/angular-mocks/angular-mocks.js', 'app/bower_components/angular-resource/angular-resource.js', 'app/bower_components/angular-cookies/angular-cookies.js', 'app/bower_components/angular-sanitize/angular-sanitize.js', 'app/bower_components/angular-route/angular-route.js', 'app/bower_components/angular-ui-utils/ui-utils.js', 'app/bower_components/angular-strap/dist/angular-strap.min.js', 'app/scripts/libs/parse-1.2.17.min.js', 'app/scripts/libs/md5.js', 'app/scripts/libs/markdown.js', '.tmp/scripts/*.js', '.tmp/scripts/**/*.js',
		//'.tmp/mock/**/*.js',
		'.tmp/spec/**/*.js'],

		// list of files / patterns to exclude
		exclude : [],

		// web server port
		port : 9090,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel : config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch : false,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers : ['PhantomJS'],
		preprocessors : {
			'.tmp/scripts/**/*.js' : ['coverage']
		},
		// coverage reporter generates the coverage
		reporters : ['progress', 'coverage'],

		// optionally, configure the reporter
		coverageReporter : {
			type : 'html',
			dir : 'coverage/'
		},
		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun : false
	});
};
