const gulp = require('gulp');
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const runSequence = require('gulp4-run-sequence');

gulp.task('processHTML', () => {
    return gulp.src('*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('processJS', () => {
    return gulp.src('*.js')
    .pipe(jshint( {esversion: 8} ))
    .pipe(jshint.reporter('default'))
    .pipe(babel({ presets: ['@babel/preset-env']}))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('babelPolyfill', () => {
    return gulp.src('node_modules/babel-polyfill/browser.js')
    .pipe(gulp.dest('dist/node_modules/babel-polyfill'));
});

gulp.task('processImages', () => {
    return gulp.src('./images/*.svg')
    .pipe(gulp.dest('dist/images'))
});

gulp.task('default', (callback) => {
    runSequence(['processHTML', 'processJS', 'babelPolyfill', 'processImages'], callback);
});