/*global require */
(function () {
    'use strict';

    var _ = require('lodash'),
        del = require('del'),
        runSequence = require('run-sequence'),
        gulp = require('gulp'),
        gulpConnect = require('gulp-connect'),
        gulpNgAnnotate = require('gulp-ng-annotate'),
        gulpConcat = require('gulp-concat'),
        gulpRename = require('gulp-rename'),
        gulpLess = require('gulp-less'),
        gulpLessGlob = require('less-plugin-glob'),
        gulpCssNano = require('gulp-cssnano'),
        gulpUglify = require('gulp-uglify'),
        mainBowerFiles = require('main-bower-files'),
        wiredep = require('wiredep'),
        path = require('path');

    gulp.task('default', function (cb) {
        runSequence('clean', 'build', 'connect', 'watch', cb);
    });

    gulp.task('clean', function (cb) {
        return del(['dist'], cb);
    });

    gulp.task('build', function (cb) {
        runSequence('build:html', 'build:css', 'build:fonts', 'build:js', 'build:bower', cb);
    });

    gulp.task('build:html', function () {
        return gulp
            .src([
                'src/**/*.html',
                '!src/index.html'
            ])
            .pipe(gulp.dest('dist'));
    });

    gulp.task('build:css', function () {
        var lessStream = gulp.src('./src/less/master.less')
            .pipe(gulpLess({
                plugins: [gulpLessGlob]
            }))
            .on('error', function (error) {
                console.log(error.message);
                this.emit('end');
            });

        return lessStream
            .pipe(gulpRename('style.min.css'))
            .pipe(gulpCssNano())
            .pipe(gulp.dest('dist/css'));
    });

    gulp.task('build:fonts', function () {
        return gulp.src('src/fonts/**/*')
            .pipe(gulp.dest('dist/fonts'));
    });

    gulp.task('build:js', function (cb) {
        return gulp.src([
                'src/app.js',
                'src/**/*-module.js',
                'src/**/*.js'
            ])
            .pipe(gulpNgAnnotate())
            .pipe(gulpConcat('app.min.js'))
            .pipe(gulpUglify())
            .pipe(gulp.dest('dist/js'));
    });

    gulp.task('build:bower', false, function (cb) {
        runSequence('build:bower:source', 'build:bower:wiredep', cb);
    });

    gulp.task('build:bower:source', false, function (cb) {
        return gulp.src(mainBowerFiles())
            .pipe(gulp.dest('dist/vendor/'));
    });

    gulp.task('build:bower:wiredep', function (cb) {
        return gulp.src('src/index.html')
            .pipe(wiredep.stream({
                fileTypes: {
                    html: {
                        replace: {
                            js:  function (filePath) {
                                var file = path.basename(filePath);
                                return '<script src="vendor/' + file + '"></script>';
                            },
                            css: function (filePath) {
                                var file = path.basename(filePath);
                                return '<link rel="stylesheet" href="vendor/' + file + '" />';
                            }
                        }
                    }
                }
            }))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('connect', function () {
        gulpConnect.server({
            port: 1111,
            root: 'dist',
            livereload: true
        });
    });

    gulp.task('watch', function () {
        return gulp.watch([
            'src/**/*'
        ], function (cb) {
            runSequence('clean', 'build', 'reload');
        });
    });

    gulp.task('reload', function () {
        return gulp.src('').pipe(gulpConnect.reload());
    });
}());
