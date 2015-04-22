'use strict';

var settings = require('./settings');
var server = require('gulp-server-livereload');
var gulp = require('gulp');

// require directory of files
require('require-dir')('./tasks');

// watch
gulp.task('watch', function () {
    gulp.watch(settings.SRC + 'script/app/**/*', ['js-app']);
    gulp.watch(settings.SRC + 'script/libs/**/*', ['js-libs']);
    gulp.watch(settings.SRC + 'style/**/*.scss', ['process_sass']);
});
 
gulp.task('server', function() {
  gulp.src('app')
    .pipe(server({
      livereload: false,
      directoryListing: false,
      open: true,
      defaultFile: 'index.html',
      log: 'info'
    }));
});

// set default task
// gulp.task("default", ["watch", "browser-sync"]);
gulp.task("default", ["watch"]);