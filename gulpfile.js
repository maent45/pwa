'use strict';

var gulp = require('gulp');
var swPrecache = require('sw-precache');

// gulp.task('generate-service-worker', function(callback) {
//   var path = require('path');
//   var swPrecache = require('sw-precache');
//   var rootDir = 'app';

//   swPrecache.write(path.join(rootDir, 'sw.js'), {
//     staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
//     stripPrefix: rootDir
//   }, callback);
// });

gulp.task('generate-sw', function() {
    var swOptions = {
        staticFileGlobs: [
            './*.html',
            './images/*.{png,svg,gif,jpg}',
            './js/**/*.js',
            './css/**/*.css',
        ]
    };
    return swPrecache.write('sw.js', swOptions);
});
