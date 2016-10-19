let gulp = require('gulp');
let sass = require('gulp-sass');
let util = require('gulp-util');
let watch = require('gulp-watch');
let connect = require('gulp-connect');
let webpack = require('webpack');
let nodemon = require('nodemon');
let config = require('./webpack.config.js');

gulp.task('style', function() {
    gulp.src('src/style/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/assets/'));
});

gulp.task("script", function (callback) {
    webpack(config, function (err, stats) {
        if (err)
            throw new util.PluginError("webpack", err);
        util.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('watch', function () {
    gulp.watch('src/style/*.scss', ['style']);
    gulp.watch('src/components/**/*.jsx', ['script']);

    gulp.src(['public/assets/*.css', 'public/assets/*.js'])
        .pipe(watch(['public/assets/*.css', 'public/assets/*.js']))
        .pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});

gulp.task('server', function() {
    nodemon({
        execMap: {
            js: 'node'
        },
        script: 'server.js',
        ext: 'js',
        watch: 'server.js'
    });
});

gulp.task('default', ['server', 'connect', 'script', 'style', 'watch']);