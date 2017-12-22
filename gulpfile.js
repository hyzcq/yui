
var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var less = require('gulp-less');
var header = require('gulp-header');
var tap = require('gulp-tap');
var nano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var pkg = require('./package.json');

var option = {base: 'src'};
var dist = __dirname + '/dist';


gulp.task('styles', function () {

    var banner = [
        '/*!',
        ' * YUI v<%= pkg.version %> (<%= pkg.homepage %>)',
        ' * Copyright <%= new Date().getFullYear() %> Nighost, Inc.',
        ' * Licensed under the <%= pkg.license %> license',
        ' */',
        ''].join('\n');
    gulp.src('src/yui.less', option)
        .pipe(sourcemaps.init())
        .pipe(less().on('error', function (e) {
            console.error(e.message);
            this.emit('end');
        }))
        .pipe(postcss([autoprefixer]))
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist))
        .pipe(nano())
        .pipe(rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest(dist))
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.less', ['styles']);
});

gulp.task('default', ['styles'], function () {
    gulp.start('watch');
});