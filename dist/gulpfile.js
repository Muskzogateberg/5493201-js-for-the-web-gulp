"use strict";

var gulp = require('gulp');

var jshint = require('gulp-jshint');

var babel = require('gulp-babel');

gulp.task('processHTML', function () {
  gulp.src('*.html').pipe(gulp.dest('dist'));
});
gulp.task('processJS', function () {
  gulp.src('*.js').pipe(jshint({
    esversion: 8
  })).pipe(jshint.reporter('default')).pipe(babel({
    presets: ['@babel/preset-env']
  })).pipe(gulp.dest('dist'));
});