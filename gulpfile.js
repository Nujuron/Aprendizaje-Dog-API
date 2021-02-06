/* eslint-disable no-undef */
'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
const jsdoc = require('gulp-jsdoc3');
const eslint = require('gulp-eslint');

sass.compiler = require('node-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
  return gulp.src("./css/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
});


//JSDocs
gulp.task('doc', function (cb) {
    gulp.src(['README.md', './js/*.js'], {read: false})
        .pipe(jsdoc(cb));
});
//ESLint
gulp.task('eslint', function(){
    return gulp.src('./js/*.js')
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

//livereload al servidor
// Static Server + watching scss/html files
gulp.task('serve', gulp.series(['sass'/*,'eslint','doc'*/], function () {

  browserSync.init({
    server: "./"
  });
  //gulp.watch("./js/*.js",gulp.series(['doc']));
  //gulp.watch("./js/*.j", gulp.series(['eslint']));
  gulp.watch("./css/*.scss", gulp.series(['sass']));
  gulp.watch("./*.html").on('change', browserSync.reload);
  gulp.watch("./js/*.js").on('change', browserSync.reload);
}));


gulp.task('default', gulp.series(['serve']));
//local server




