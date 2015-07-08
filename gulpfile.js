var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var sync = require('browser-sync').create();

var dev_dir = 'dev';
var prod_dir = 'prod';
var scss_path = dev_dir + '/sass/**/*.scss';
var js_path = dev_dir + '/js/**/**/*.js';
var jsx_path = dev_dir + '/js/views/**/*.jsx';

gulp.task('js_compile', function(){
  var b = browserify({
    entries: [dev_dir + '/js/views/main.js'],
    extensions: ['.js', '.jsx']
  });
  return b.transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('app.js'))
    .pipe(gulp.dest(prod_dir + '/js'))
    .pipe(sync.stream());
});

gulp.task('js_watch', function(){
  gulp.watch([jsx_path, js_path], ['js_compile']).on('change', sync.reload);
});

gulp.task('browser-sync', function() {
  sync.init({
    server: {
      baseDir: "./prod"
    }
  });
});

gulp.task('default', ['js_compile', 'js_watch', 'browser-sync']);
