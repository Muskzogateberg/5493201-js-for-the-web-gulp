const gulp = require('gulp');
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('processHTML', () => {
    gulp.src('*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('processJS', () => {
    gulp.src('*.js')
    .pipe(jshint( {esversion: 8} ))
    .pipe(jshint.reporter('default'))
    .pipe(babel({ presets: ['@babel/preset-env']}))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('babelPolyfill', () => {
    gulp.src('node_modules/babel-polyfill/browser.js')
    .pipe(gulp.dest('dist/node_modules/babel-polyfill'));
});

gulp.task('processImages', () => {
    gulp.src('./images/*.svg')
    .pipe(gulp.dest('dist/images'))
});