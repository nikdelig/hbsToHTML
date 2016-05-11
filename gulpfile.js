var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var hbsAll = require('gulp-compile-handlebars');
var rename = require("gulp-rename");
var less = require('gulp-less-sourcemap');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');


gulp.task('default', function () {

  options = {
    batch : ['templates/partials'],
  }
 
  return gulp.src('templates/index.handlebars')
    .pipe(handlebars(options))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('templates'));
});

gulp.task('less', function () {
  gulp.src('./less/*.less')
    .pipe(less({
        sourceMap: {
            sourceMapRootpath: '../less' // Optional absolute or relative path to your LESS files
        }
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('prefix', function () {
  return gulp.src('css/main.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('default', ['less', 'prefix']);

gulp.task('watch', [ 'default', 'less'], function () {
  gulp.watch('templates/partials/**/*.hbs', ['default']);
  gulp.watch('less/**/*.less', ['less']);
});
