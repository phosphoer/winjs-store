var gulp = require('gulp')
var config = require('../config').ts;
var browserSync = require('browser-sync');
var ts = require('gulp-typescript');
 
var tsProject = ts.createProject({
      declarationFiles: true,
      noExternalResolve: false
});

gulp.task('ts', function() {
  return gulp.src(config.src)
    .pipe(ts(tsProject))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream: true}));
});
