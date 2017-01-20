'use strict';

var gulp = require('gulp');
var swPrecache = require('sw-precache');

gulp.task('generate-sw', function() {
    var swOptions = {
        staticFileGlobs: [
            './*.html',
            './images/*.{png,svg,gif,jpg}',
            './js/**/*.js',
            './css/**/*.css',
        ],
        "stripPrefix": "app/",
        "runtimeCaching": [{
            urlPattern: /^https:\/\/query\.yahooapis\.com\/v1/,
            handler: 'fastest'
        }, {
            urlPattern: /^https:\/\/newsapi\.org\/v1\/articles/,
            handler: 'networkFirst',
            options: {
                cache: {
                  name: 'articles-cache'
                }
            }
        }]
    };
    return swPrecache.write('sw.js', swOptions);
});
