/* jshint camelcase:false */
// Generated on 2013-12-06 using generator-angular 0.6.0-rc.2
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

var serverEndpoint = 'http://localhost:8181';
var proxyConfig = {
	proxy: {
		forward: {
			'/socket.io': serverEndpoint,
			'/api': serverEndpoint
		}
	}
};

var LIVERELOAD_PORT = 35728;
var SERVER_PORT = 9000;
//var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

	//Connect proxy to route requests to localhost:8181/api
	grunt.loadNpmTasks('grunt-connect-proxy');
	require('json-proxy').initialize({});
	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		yeoman: {
			// configurable paths
			app: require('./bower.json').appPath || 'app',
			dist: 'dist',
			tmp: '.tmp'
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			coffee: {
				files: ['<%= yeoman.app %>/scripts/{,*/}*.{coffee,litcoffee,coffee.md}'],
				tasks: ['newer:coffee:dist']
			},
			coffeeTest: {
			files: ['test/spec/{,**/}*.{coffee,litcoffee,coffee.md}'],
				tasks: ['coffee:test', 'newer:coffee:test', 'karma:unit']
			},
			coffeeProtractorTest: {
			files: ['test/protractor/{,**/}*.{coffee,litcoffee,coffee.md}'],
				tasks: ['coffee:test', 'newer:coffee:test', 'protractor']
			},
			compass: {
				files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
				tasks: ['compass:server', 'autoprefixer']
			},
			styles: {
				files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
				tasks: ['newer:copy:styles', 'autoprefixer']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= yeoman.app %>/{,**/}*.html',
					'.tmp/styles/{,*/}*.css',
					'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				],
				tasks: ['ngtemplates']
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: '127.0.0.1',
				livereload: 35729,
				middleware: function (connect, options) {
					return [require('json-proxy').initialize(proxyConfig),
						mountFolder(connect, '.grunt'),
						mountFolder(connect, '.tmp')
					];
				}
			},
			livereload: {
				options: {
					open: true,
					base: ['.tmp', '<%= yeoman.app %>'],
					middleware: function (connect, options) {
						return [require('json-proxy').initialize(proxyConfig),
						mountFolder(connect, '.tmp'),
							mountFolder(connect, 'app')
						];
					}
				}
			},
			test: {
				options: {
					port: 9292,
					base: ['.tmp', 'test', '<%= yeoman.app %>']
				}
			},
			dist: {
				options: {
					livereload: false,
					base: '<%= yeoman.dist %>',
					middleware: function (connect, options) {
						return [require('json-proxy').initialize(proxyConfig),
							mountFolder(connect, 'dist')
						];
					}
				}
			},
			docs: {
				options: {
					port: 9191,
					open: true,
					middleware: function (connect, options) {
						return [
							mountFolder(connect, '.grunt'),
							mountFolder(connect, '.tmp'),
							mountFolder(connect, 'docs')
						];
					}
				}
			}
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				//'Gruntfile.js'
			]
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [
					{
						dot: true,
						src: ['.tmp', '<%= yeoman.dist %>/*', '!<%= yeoman.dist %>/.git*']
					}
				]
			},
			server: '.tmp'
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: '.tmp/styles/',
						src: '{,*/}*.css',
						dest: '.tmp/styles/'
					}
				]
			}
		},

		// Compiles CoffeeScript to JavaScript
		coffee: {
			options: {
				sourceMap: true,
				bare: true,
				sourceRoot: ''
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.app %>/scripts',
						src: '{,*/}*.coffee',
						dest: '.tmp/scripts',
						ext: '.js'
					}
				]
			},
			test: {
				files: [
					{
						expand: true,
						cwd: 'test',
						src: '{,**/}*.{coffee,litcoffee,coffee.md}',
						dest: '.tmp',
						ext: '.js'
					}
				]
			},
			e2e: {
				files: [
					{
						expand: true,
						cwd: 'test/e2e',
						src: '{,*/}*.coffee',
						dest: '.tmp/e2e',
						ext: '.js'
					}
				]
			},
			routes: {
				files: [
					{
						expand: true,
						cwd: 'routes',
						src: '{,*/}*.coffee',
						dest: '.tmp/routes',
						ext: '.js'
					}
				]
			}
		},

		// Compiles Sass to CSS and generates necessary files if requested
		compass: {
			options: {
				sassDir: '<%= yeoman.app %>/styles',
				cssDir: '.tmp/styles',
				generatedImagesDir: '.tmp/images/generated',
				imagesDir: '<%= yeoman.app %>/images',
				javascriptsDir: '<%= yeoman.app %>/scripts',
				fontsDir: '<%= yeoman.app %>/styles/fonts',
				importPath: '<%= yeoman.app %>/bower_components',
				httpImagesPath: '/images',
				httpGeneratedImagesPath: '/images/generated',
				httpFontsPath: '/styles/fonts',
				relativeAssets: false,
				assetCacheBuster: false
			},
			dist: {
				options: {
					generatedImagesDir: '<%= yeoman.dist %>/images/generated'
				}
			},
			server: {
				options: {
					debugInfo: true
				}
			}
		},

		// Renames files for browser caching purposes
		rev: {
			dist: {
				files: {
					src: ['<%= yeoman.dist %>/scripts/{,*/}*.js', '<%= yeoman.dist %>/styles/{,*/}*.css',
						//'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
						'<%= yeoman.dist %>/styles/fonts/*']
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: '<%= yeoman.app %>/index.html',
			options: {
				dest: '<%= yeoman.dist %>'
			}
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			options: {
				assetsDirs: ['<%= yeoman.dist %>']
			}
		},

		// The following *-min tasks produce minified files in the dist folder
		imagemin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.app %>/images',
						src: '{,*/}*.{png,jpg,jpeg,gif}',
						dest: '<%= yeoman.dist %>/images'
					}
				]
			}
		},
		svgmin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.app %>/images',
						src: '{,*/}*.svg',
						dest: '<%= yeoman.dist %>/images'
					}
				]
			}
		},
		htmlmin: {
			dist: {
				options: {
					// Optional configurations that you can uncomment to use
					// removeCommentsFromCDATA: true,
					// collapseBooleanAttributes: true,
					// removeAttributeQuotes: true,
					// removeRedundantAttributes: true,
					// useShortDoctype: true,
					// removeEmptyAttributes: true,
					// removeOptionalTags: true
					/*
					 collapseBooleanAttributes:      true,
					 collapseWhitespace:             false,
					 removeAttributeQuotes:          true,
					 removeComments:                 true, // Only if you don't use comment directives!
					 removeEmptyAttributes:          true,
					 removeRedundantAttributes:      true,
					 removeScriptTypeAttributes:     true,
					 removeStyleLinkTypeAttributes:  true
					*/

				},
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.app %>',
						src: ['*.html', 'views/*.html'],
						dest: '<%= yeoman.dist %>'
					}
				]
			}
		},

		//Less
		less: {
			development: {
				options: {
					paths: ["cms-content/themes"]
				},
				files: {
					".tmp/cms-content/themes/**/*": "<%= yeoman.app %>/cms-content/themes/**/*"
				}
			},
			production: {
				options: {
					paths: ["assets/css"],
					cleancss: true
				},
				files: {
					".tmp/cms-content/themes/**/*.css": "<%= yeoman.app %>/cms-content/themes/**/*.less"
				}
			}
		},

		// Allow the use of non-minsafe AngularJS files. Automatically makes it
		// minsafe compatible so Uglify does not destroy the ng references
		ngmin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '.tmp/concat/scripts',
						src: '*.js',
						dest: '.tmp/concat/scripts'
					}
				]
			}
		},

		// Replace Google CDN references
		cdnify: {
			dist: {
				html: ['<%= yeoman.dist %>/*.html']
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '<%= yeoman.app %>',
						dest: '<%= yeoman.dist %>',
						src: ['*.{ico,png,txt}', '.htaccess',
							//'bower_components/**/*',
							'scripts/libs/*',
							'images/{,*/}*.{webp}',
							'fonts/*']
					},
					{
						expand: true,
						cwd: '.tmp/images',
						dest: '<%= yeoman.dist %>/images',
						src: ['generated/*']
					}
				]
			},
			styles: {
				expand: true,
				cwd: '<%= yeoman.app %>/styles',
				dest: '.tmp/styles/',
				src: '{,*/}*.css'
			}
		},

		// Run some tasks in parallel to speed up the build process
		concurrent: {
			server: ['coffee:dist',
				//	'compass:server',
				'ngtemplates', 'copy:styles'],
			test: ['coffee',
				//	'compass',
				'copy:styles'],
			dist: [
				'coffee',
				//	'compass:dist',
				'ngtemplates',
				'copy:styles', 'svgmin', 'htmlmin']
		},

		// By default, your `index.html`'s <!-- Usemin block --> will take care of
		// minification. These next options are pre-configured if you do not wish
		// to use the Usemin blocks.
		// cssmin: {
		//   dist: {
		//     files: {
		//       '<%= yeoman.dist %>/styles/main.css': [
		//         '.tmp/styles/{,*/}*.css',
		//         '<%= yeoman.app %>/styles/{,*/}*.css'
		//       ]
		//     }
		//   }
		// },
		// uglify: {
		//   dist: {
		//     files: {
		//       '<%= yeoman.dist %>/scripts/scripts.js': [
		//         '<%= yeoman.dist %>/scripts/scripts.js'
		//       ]
		//     }
		//   }
		// },
		// concat: {
		//   dist: {}
		// },

		// Test settings
		karma: {
			unit: {
				configFile: 'karma.conf.js',
				singleRun: true
			},
			e2e: {
				configFile: 'karma-e2e.conf.js',
				singleRun: true
			}
		},
		jasmine_node: {
			options: {
				coffee: true,
				match: '.',
				matchall: true,
				extensions: '.coffee',
				specNameMatcher: 'Spec', // load only specs containing specNameMatcher
				projectRoot: '.',
				requirejs: false,
				forceExit: true,
				jUnit: {
					report: false,
					savePath: './build/reports/jasmine/',
					useDotNotation: true,
					consolidate: true
				}
			},
			all: ['test/routes/']
		},

		//Generate angularjs docs
		ngdocs: {
			options: {
				dest: 'docs',
				html5Mode: false,
				startPage: '/api',
				title: "AngularCMS Docs",
				//imageLink: "http://my-domain.com",

				titleLink: "/api",
				bestMatch: true,
			},
			api: {
				src: [
					'.tmp/scripts/**/*.js',
					'!.tmp/spec/**/*.js'
				],
				title: 'API'
			},
			tutorial: {
				src: ['content/tutorial/*.ngdoc', 'content/*.ngdoc'],
				title: 'Tutorial'
			},
		},

		//https://npmjs.org/package/grunt-angular-templates
		ngtemplates: {
			app: {
				src: '<%= yeoman.app %>/views/**/*.html',
				dest: '.tmp/scripts/templates.js',
				options: {
					module: 'angularCmsApp',
					//url: 'views',
					url: function (url) {
						return url.replace('app/', '');
					},
					prefix: '',
					htmlmin: {
						collapseWhitespace: true,
						collapseBooleanAttributes: true
					}
					//  usemin: 'dist/vendors.js' // <~~ This came from the <!-- build:js --> block
				}
			}
		},

		/* ======================[ @TODO: Bower Install ]====================== */
		'bower-install': {
			app: {
				src: ['app/index.html'],
				cwd: '',
				ignorePath: '',
				exclude: [],
				fileTypes: {}
			}
		},

		//Protractor webdriver & protractor
		protractor_webdriver: {
			test: {
				options: {
					command: 'webdriver-manager start'
				}
			}
		},
		protractor: {
			options: {
				keepAlive: true, // If false, the grunt process stops when the test fails.
				noColor: false, // If true, protractor will not use colors in its output.
				args: {
				}
			},
			test: {
				options: {
					configFile: "protractor.conf.js",
					args: {}
				}
			}
		},


		//Coveralls code coverage
		coveralls: {
			options: {
				debug: true,
				coverageDir: 'coverage',
				dryRun: true,
				force: true,
				recursive: true
			}
		},
		// Configure a mochaTest task
		mochaTest: {
			test: {
				options: {
					reporter: 'spec',
					//captureFile: 'results.txt', // Optionally capture the reporter output to a file
					quiet: false, // Optionally suppress output to standard out (defaults to false)
					clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
				},
				src: [
					'.tmp/routes/*-spec.js'
				]
			}
		}
	});

	grunt.registerTask('serve', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run(['clean:server', 'concurrent:server', 'autoprefixer', 'connect:livereload', 'watch']);
	});

	grunt.registerTask('server', function () {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve']);
	});

	grunt.registerTask('test', function (target) {
		grunt.task.run(['clean:server', 'concurrent:test', 'autoprefixer', 'connect:test']);
		if (target === 'e2e') {
			return grunt.task.run(['karma', 'protractor_webdriver', 'protractor', 'coveralls']);
		} else if(target === 'server'){
			return grunt.task.run(['coffee:test', 'mochaTest']);
		} else {
			return grunt.task.run(['karma:unit', 'coveralls']);
		}
	});

grunt.registerTask('ptor', ['coffee:test', 'protractor_webdriver', 'protractor']);
	grunt.registerTask('build-docs', [ 'useminPrepare', 'autoprefixer', 'concat', 'ngmin']);
	grunt.registerTask('build', ['clean:dist', 'useminPrepare', 'concurrent:dist', 'autoprefixer', 'concat', 'ngmin', 'copy:dist', /*'cdnify',*/ 'cssmin', 'uglify', 'rev', 'usemin']);

	grunt.registerTask('docs', ['coffee', 'ngdocs', 'connect:docs', 'watch:ngdocs']);
	grunt.registerTask('default', ['newer:jshint', 'test', 'build']);

	grunt.registerTask('heroku:production', 'build');
	grunt.registerTask('heroku:development', 'build');
};
