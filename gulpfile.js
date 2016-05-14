var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var hbsAll = require('gulp-handlebars-all');
var handlebars = require('handlebars');
var rename = require('gulp-rename');
var less = require('gulp-less');
var path = require('path');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-html-minifier');
const imagemin = require('gulp-imagemin');
var reporter = require('gulp-less-reporter');
var watch = require('gulp-watch');


handlebars.registerPartial('header', '{{header}}'),
handlebars.registerPartial('details', '{{details}}'),
handlebars.registerPartial('info', '{{info}}'),
handlebars.registerPartial('prefooter', '{{prefooter}}'),
handlebars.registerPartial('footer', '{{footer}}')


gulp.task('default', function () {

    options = {
        partialsDirectory : ['./templates/partials/**']
    }

    return gulp.src('templates/index.hbs')
        .pipe(gulpHandlebars( options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('../'));
});

gulp.task('hbsToHTML', function() {
   gulp.src('templates/*.hbs')
  .pipe(hbsAll('html', {
    context: {foo: 'bar'},
 
    partials: ['templates/partials/**/*.hbs'],
 
  }))
  .pipe(rename('index.html'))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest(''));
});

gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
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

gulp.task('reporter', function() {
  gulp.src('less/main.less').
    pipe(less()).on('error', reporter);
});

gulp.task('image', () =>
  gulp.src('templates/partials/**/*.png')
    .pipe(imagemin())
    .pipe(gulp.dest('img'))
);

gulp.task('default', ['hbsToHTML', 'less', 'prefix', 'reporter', 'image']);

gulp.task('watch', [ 'default', 'hbsToHTML', 'less', 'prefix'], function () {
  gulp.watch('templates/partials/**/*.hbs', ['default']);
  gulp.watch('templates/**/*.hbs', ['hbsToHTML']);
  gulp.watch('less/**/*.less', ['less']);
});
