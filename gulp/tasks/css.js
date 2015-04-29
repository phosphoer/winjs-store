var gulp = require('gulp');
var config = require('../config').css;
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('css', function() {
    return gulp.src(config.src)
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({stream: true}));
  });
