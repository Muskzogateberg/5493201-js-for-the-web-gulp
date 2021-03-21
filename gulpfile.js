const gulp = require('gulp');
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const runSequence = require('gulp4-run-sequence');
const browserSync = require('browser-sync').create();


gulp.task('default', (callback) => {
    runSequence(gulp.parallel('processHTML', 'processJS', 'babelPolyfill', 'processIMG'), 'watch', callback());
});

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

gulp.task('processIMG', () => {
    return gulp.src('./images/*.svg')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });
});

function reload(done) {
    browserSync.reload();
    done();
}

gulp.task('watch', gulp.series('browserSync'), () => {
    gulp.watch('*.js', 'processJS');
    gulp.watch('*.html', 'processHTML');
    gulp.watch('images/*', 'processIMG');
    gulp.watch('./dist/*.js').on('change', gulp.series(reload));
    gulp.watch('./dist/*.html').on('change', gulp.series(reload));
    gulp.watch('./dist/images/*').on('change', gulp.series(reload));
});
