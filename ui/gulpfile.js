var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var shell = require('gulp-shell');

gulp.task('connect', function () {
    connect.server({
        root: 'build',
        port: 4000
    });
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['browserify']);
});

// run the flask server
gulp.task('flask', shell.task(['python ../server/server.py']));

gulp.task('browserify', function() {
    // Grabs the app.js file
    return browserify('./app/app.js')
        // bundles it and creates a file called app.js
        .bundle()
        .pipe(source('app.js'))
        // saves it the build/js/ directory
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('default', ['connect', 'watch']);