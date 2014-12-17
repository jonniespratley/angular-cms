'use strict';

var del = require('del');
var gulp = require('gulp');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var protractor = require('gulp-protractor').protractor;

var server = require('gulp-server-livereload');

gulp.task('webserver', function() {
	gulp.src('app')
		.pipe(server({
			livereload: true,
			defaultFile: 'index.html',
			directoryListing: true,
			open: true
		}));
});


gulp.task('clean', function(cb) {
	del(['build'], cb);
});

/**
 * CoffeeScript Source Files
 */
gulp.task('js', function () {
	gulp
		.src('./app/scripts/**/*.coffee')
		.pipe(coffee({
			bare: true
		}))
		.pipe(uglify())
		.pipe(gulp.dest('./.tmp/scripts'));
});

/**
 * CoffeeScript Test Files
 */
gulp.task('js:test', function () {
	gulp.src('./test/**/*.coffee')
		.pipe(coffee({
			bare: true
		})).pipe(gulp.dest('./.tmp'));
});

gulp.task('watch', function () {
	gulp.watch('./app/scripts/**/*.coffee', ['js']);
	gulp.watch('./test/**/*.coffee', ['js:test'])
});


gulp.task('test:e2e', ['js:test'], function(){
	gulp.src(['./.tmp/protractor/**/*-spec.js'])
		.pipe(protractor({
			configFile: 'protractor.conf.js'
		}))
		.on('error', function (e) {
			throw e;
		});
});

gulp.task('default', ['js:test', 'test']);