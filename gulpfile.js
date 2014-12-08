var coffee, gulp, uglify;

gulp = require( 'gulp' );
coffee = require( 'gulp-coffee' );
uglify = require( 'gulp-uglify' );

gulp.task( 'js', function () {
	return gulp
		.src( './app/scripts/**/*.coffee' )
		.pipe( coffee() )
		.pipe( uglify() )
		.pipe( gulp.dest( './.tmp/scripts' ) );
} );

gulp.task( 'watch', function () {
	return gulp
		.watch( './app/scripts/**/*.coffee', ['js'] );
} );
