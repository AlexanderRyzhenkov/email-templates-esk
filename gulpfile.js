'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var inlineCss = require('gulp-inline-css');
var del = del = require('del');

var buildTasks = [
    'sass',
    'html',
    'inline',
    'clean'
];

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('./src/scss/*.scss')
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(gulp.dest('temp/css/'));
});

gulp.task('html', function buildHTML() {
    return gulp.src('src/pug/*.pug')
    .pipe(pug({pretty:true}))
    .pipe(gulp.dest('temp/'))
});

gulp.task('inline', function() {
    return gulp.src(['temp/*.html', '!temp/layout.html'])
        .pipe(inlineCss({
                applyStyleTags: true,
                applyLinkTags: true,
                removeStyleTags: true,
                removeLinkTags: true
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('clean', function(){
    return del('temp/**', {force:true});
});

gulp.task('build', gulp.series(buildTasks));

gulp.task('watch', function() {
    gulp.watch('src/pug/*.pug', gulp.series(buildTasks));
    gulp.watch('src/scss/*.scss', gulp.series(buildTasks));
});

gulp.task('default', gulp.series(['build', 'watch']));