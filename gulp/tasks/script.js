'use strict';

var gulp        = require('gulp');
var plumber     = require('gulp-plumber');
var browserify  = require('gulp-browserify');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var settings    = require('../settings');

// compile application
gulp.task('js-app', function () {
    return gulp.src(settings.SRC + 'script/app/index.js', { read: false })
        .pipe(plumber())
        .pipe(browserify({ noParse: "node_modules/mixing/index.js"}))
        // .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest(settings.DEST + 'js'));
});

// compile application
gulp.task('js-libs', function () {
    return gulp.src([
        settings.SRC + 'script/libs/**/*.js'
    ])
        .pipe(plumber())
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(settings.DEST + 'js'));
});