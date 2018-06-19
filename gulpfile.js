var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var nested = require('postcss-nested');

gulp.task('css', function () {
    var plugins = [
      nested(),
      autoprefixer(),
    ];
    return gulp.src('css/main.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('build/'));
});
