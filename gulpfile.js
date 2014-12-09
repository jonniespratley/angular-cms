var coffee, gulp, uglify;

gulp = require( 'gulp' );
coffee = require( 'gulp-coffee' );
uglify = require( 'gulp-uglify' );

gulp.task( 'js', function () {
	gulp
		.src( './app/scripts/**/*.coffee' )
		.pipe( coffee() )
		.pipe( uglify() )
		.pipe( gulp.dest( './.tmp/scripts' ) );
} );
gulp.task( 'js:test', function () {
	gulp
		.src( './test/**/*.coffee' )
		.pipe( coffee() )
		.pipe( uglify() )
		.pipe( gulp.dest( './.tmp' ) );
} );

gulp.task( 'watch', function () {
	gulp.watch( './app/scripts/**/*.coffee', ['js'] );
	gulp.watch( './test/**/*.coffee', ['js:test'] )
} );
