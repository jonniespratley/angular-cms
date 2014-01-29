// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
	config.set({
		// base path, that will be used to resolve files and exclude
		basePath: '',

		// testing framework to use (jasmine/mocha/qunit/...)
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files: [
			'app/bower_components/jquery/jquery.js',
			'app/bower_components/angular/angular.js',
			'app/bower_components/angular-animate/angular-animate.js',
			'app/bower_components/angular-mocks/angular-mocks.js',
			'app/bower_components/angular-resource/angular-resource.js',
			'app/bower_components/angular-cookies/angular-cookies.js',
			'app/bower_components/angular-sanitize/angular-sanitize.js',
			'app/bower_components/angular-route/angular-route.js',
			'app/bower_components/angular-ui-utils/ui-utils.js',
            'app/bower_components/angular-strap/dist/angular-strap.min.js',

			'http://www.parsecdn.com/js/parse-1.2.8.min.js',
			
			//Libs
			'app/scripts/libs/markdown.js',
				 //'app/scripts/*.coffee',
				 //'app/scripts/**/*.coffee',
				//'test/mock/**/*.coffee',
				//'test/spec/**/*.coffee',

			'.tmp/scripts/*.js',
			'.tmp/scripts/**/*.js',
			'.tmp/mock/**/*.js',
			'.tmp/spec/**/*.js'			
		],

		preprocessors: {
			// source files, that you wanna generate coverage for
			// do not include tests or libraries
			// (these files will be instrumented by Istanbul)
			'app/scripts/*.coffee': ['coffee'],
			'app/scripts/**/*.coffee': ['coffee'],
			'test/e2e/*.coffee': ['coffee'],
			'test/e2e/**/*.coffee': ['coffee'],
			'test/mock/**/*.coffee': ['coffee'],
			'test/spec/**/*.coffee': ['coffee']
		},

		// list of files / patterns to exclude
		exclude: [],

		// web server port
		port: 8080,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJS'],


		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false
	});
};
