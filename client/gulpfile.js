/*global require */
(function () {
    'use strict';

    var _ = require('lodash'),
        del = require('del'),
        runSequence = require('run-sequence'),
        gulp = require('gulp'),
        gulpUtil = require('gulp-util'),
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
        path = require('path'),
        gulpBabel = require('gulp-babel');

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
                'app/**/*.html',
                '!app/index.html'
            ])
            .pipe(gulp.dest('dist'));
    });

    gulp.task('build:css', function () {
        var lessStream = gulp.src('./app/styles/master.less')
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
        return gulp.src([
                'app/fonts/**/*',
                'bower_components/bootstrap/fonts/**/*'
            ])
            .pipe(gulp.dest('dist/fonts'));
    });

    gulp.task('build:js', function (cb) {
        return gulp.src([
                'app/app.js',
                'app/**/*.module.js',
                'app/**/*.js'
            ])
            .pipe(gulpNgAnnotate())
            .pipe(gulpBabel({
                presets: ['es2015']
            }))
            .pipe(gulpUglify().on('error', gulpUtil.log))
            .pipe(gulpConcat('app.min.js'))
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
        return gulp.src('app/index.html')
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
            'app/**/*'
        ], function (cb) {
            runSequence('clean', 'build', 'reload');
        });
    });

    gulp.task('reload', function () {
        return gulp.src('').pipe(gulpConnect.reload());
    });
}());
