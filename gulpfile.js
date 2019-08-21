'use strict';

// Main:
const gulp = require('gulp');
const notifier = require('node-notifier');
const plumber = require('gulp-plumber');
const gulpIf = require('gulp-if');
const yargs =  require('yargs');

// Compile:
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

// Styles:
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');

const argv = yargs.argv;
const production = !!argv.production;

// -------------------------------------
//   Available tasks
// -------------------------------------
//     say:hello
// *************************************

const paths = {
  styles: {
    src: './src/styles/*.{scss,sass}',
    dist: './dist/assets/styles/',
    watch: './src/styles/**/*.{scss,sass}',
  },
};

// -------------------------------------
//   Task: styles
// -------------------------------------

gulp.task('styles', function () {
  return gulp.src(paths.styles.src)
    .pipe(plumber())
    .pipe(gulpIf(!production, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulpIf(!production, sourcemaps.write()))
    .pipe(gulp.dest(paths.styles.dist));
});

// -------------------------------------
//   Task: say:hello
// -------------------------------------

gulp.task('say:hello', function (done) {
  notifier.notify({
    title: 'Hello World!',
    message: 'Very very cruel frontend world...',
  });

  done();
});

// -------------------------------------
//   Task: default
// -------------------------------------
gulp.task('default', gulp.series('styles'));

// -------------------------------------
//   Task: build
// -------------------------------------
gulp.task('build', gulp.series('styles'));