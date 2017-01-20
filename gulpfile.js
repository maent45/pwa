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
        /*--- CONFIGURE RUNTIMECACHING TO CACHE API URL PATTERNS ---*/
        "stripPrefix": "app/",
        "runtimeCaching": [{
            /*--- for weather ---*/
            urlPattern: /^https:\/\/query\.yahooapis\.com\/v1/,
            handler: 'fastest'
        }, {
            /*--- for article text ---*/
            urlPattern: /^https:\/\/newsapi\.org\/v1\/articles/,
            handler: 'networkFirst',
            options: {
                cache: {
                  name: 'articles-cache'
                }
            }
        }, {
            /*--- for article images ---*/
            urlPattern: /^https:\/\/timedotcom\.files\.wordpress\.com/,
            handler: 'networkFirst',
            options: {
                cache: {
                  name: 'articles-img-cache'
                }
            }
        }]
    };
    return swPrecache.write('sw.js', swOptions);
});
