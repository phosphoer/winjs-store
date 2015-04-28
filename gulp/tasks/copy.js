var gulp = require('gulp');
var config = require('../config');
var browserSync  = require('browser-sync');
var ts = require('gulp-typescript');

var tasks = ['css', 'js', 'markup', 'lib'];

tasks.forEach(function(task) {
  gulp.task(task, function() {
    return gulp.src(config[task].src)
        .pipe(gulp.dest(config[task].dest))
        .pipe(browserSync.reload({stream: true}));
  });
});

