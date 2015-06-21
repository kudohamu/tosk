var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var sync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');

var dev_dir = 'dev';
var prod_dir = 'prod';
var js_path = dev_dir + '/js/**/**/*.js';
var jsx_path = dev_dir + '/js/views/**/*.jsx';

gulp.task('browserify', function(){
  var b = browserify({
    entries: [dev_dir + '/js/views/main.js'],
    transform: [reactify],
    extensions: ['.js', '.jsx']
  });
  return b.bundle()
    .pipe(plumber())
    .pipe(source('app.js'))
    .pipe(gulp.dest(prod_dir + '/js'))
    .pipe(sync.stream());
});

gulp.task('js_watch', function(){
  gulp.watch([jsx_path, js_path], ['browserify']).on('change', sync.reload);
});

gulp.task('browser-sync', function() {
  sync.init({
    server: {
      baseDir: "./prod"
    }
  });
});

gulp.task('default', ['browserify', 'js_watch', 'browser-sync']);
