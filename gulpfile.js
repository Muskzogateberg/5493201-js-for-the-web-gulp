// Initialize modules
const gulp = require('gulp'); // gulp4 { src, dest, watch, series, parallel}
const jshint = require('gulp-jshint'); // verify code quality
const babel = require('gulp-babel'); // transpile code
const uglify = require('gulp-uglify'); // minimify code
const runSequence = require('gulp4-run-sequence'); // use it in default task
const { parallel } = require('gulp');
const browserSync = require('browser-sync').create(); // use it to reload browser after changes

// File path variables
const files = {
    htmlPath: './*.html',
    jsPath: './*.js',
    imgPath: './images/*',
    babelPolyfill: './node_modules/babel-polyfill/browser.js'
};

/* ---- Tasks start here ---- */

// processHTML
function processHTML (){
    return gulp.src(files.htmlPath)
    .pipe(gulp.dest('dist'));
}

// processJS
function processJS (){
    return gulp.src(files.jsPath)
    .pipe(jshint( {esversion: 8} ))
    .pipe(jshint.reporter('default'))
    .pipe(babel({ presets: ['@babel/preset-env']}))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
}

// babelPolyfill task
function babelPolyfill (){
    return gulp.src(files.babelPolyfill)
    .pipe(gulp.dest('dist/node_modules/babel-polyfill/'));
}

// processIMG
function processIMG (){
    return gulp.src(files.imgPath)
    .pipe(gulp.dest('dist/images/'));
}

/* ---- Tasks end here ---- */

// Watch
function watch(){
    browserSync.init({ 
        server: {
            baseDir: './dist/'
        }
    });
    gulp.watch(files.htmlPath, processHTML);
    gulp.watch(files.jsPath, processJS);
    gulp.watch(files.babelPolyfill, babelPolyfill);
    gulp.watch(files.imgPath, processIMG);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
    gulp.watch('dist/*.js').on('change', browserSync.reload);
    gulp.watch('dist/images/*').on('add', browserSync.reload);
}

exports.watch = watch;

exports.default = gulp.series (
    gulp.parallel(processHTML, processJS, processIMG, babelPolyfill),
    watch
);