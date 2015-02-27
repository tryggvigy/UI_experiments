/*jshint ignore: start*/

// PATHS
var basePaths = {
    src: 'app/',
    dest: 'dist/'
};
var paths = {
    bower: {
      src: basePaths.src + 'bower_components/**/*',
      dest: basePaths.dest + 'bower_components/'
    },
    routes: {
      src: basePaths.src + 'routes/**/*',
      dest: basePaths.dest + 'routes/'
    },
    index : {
      src: basePaths.src + 'index.html'
    }
};
var scripts = {
  src: paths.routes.src + '**/*.js'
}


// FIRES ON FILE CHANGE.
var changeEvent = function(evt) {
    gutil.log('\n\nFile', gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + basePaths.src + ')/'), '')), 'was', gutil.colors.magenta(evt.type)+', running tasks...');
};


var gulp = require('gulp');
var es = require('event-stream');
var gutil = require('gulp-util');

/**
 * Searches for gulp plugins starting with [gulp] or [gulp-]
 * in package.json and loads them into this obj.
 */
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

//#########################################
//################ TASKS ##################
//#########################################

gulp.task('copy', function () {
  gulp.src([basePaths.src + 'index.html'])
    .pipe(gulp.dest(basePaths.dest));
  gulp.src([paths.routes.src])
    .pipe(gulp.dest(paths.routes.dest));
});

gulp.task('bower', function () {
  gulp.src([paths.bower.src])
    .pipe(gulp.dest(paths.bower.dest));
});

// Lint JS
gulp.task('lint', function() {
  gulp.src([scripts.src])
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

// Watch Our Files
gulp.task('watch', function() {
    plugins.livereload.listen();
    gulp.watch(paths.routes.dest+'**/*').on('change', plugins.livereload.changed);

    gulp.watch(scripts.src, ['lint']).on('change', function(evt) {
        changeEvent(evt);
    });
    gulp.watch([paths.index.src,
            paths.routes.src],
            ['copy'])
    .on('change', function(evt) {
        changeEvent(evt);
    });
});


// Default
gulp.task('default', ['bower', 'copy', 'watch']);
