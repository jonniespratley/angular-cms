var gulp = require('gulp');
var ngmin = require('gulp-ngmin');

gulp.task('default', function () {
    return gulp.src('app/scripts/**/*.coffee')
        .pipe(ngmin({dynamic: true}))
        .pipe(gulp.dest('./dist'));
});
