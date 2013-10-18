// Generated on 2013-10-17 using generator-impress 0.0.2
'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        watch: {
            options: {
                nospawn: true,
                livereload: LIVERELOAD_PORT
            },
            livereload: {
                files: [
                    'index.html',
                    'js/*.js',
                    'css/*.css',
                    'steps/*.html',
                    'steps/list.json'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    // cwd: '',
                    dest: 'dist',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'steps/*',
                        // 'bower_components/**/*',
                        // 'images/{,*/}*.{gif,webp}',
                        // 'styles/fonts/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: 'dist/images',
                    src: [
                        'generated/*'
                    ]
                }]
            }
            // styles: {
            //     expand: true,
            //     cwd: '<%= yeoman.app %>/styles',
            //     dest: '.tmp/styles/',
            //     src: '{,*/}*.css'
            // }
        },
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'dist'
            }
        },
        usemin: {
            html: ['dist/{,*/}*.html'],
            css: ['dist/styles/{,*/}*.css'],
            options: {
                dirs: ['dist']
            }
        },
        cssmin: {
            // By default, your `index.html` <!-- Usemin Block --> will take care of
            // minification. This option is pre-configured if you do not wish to use
            // Usemin blocks.
            // dist: {
            //   files: {
            //     'dist/styles/main.css': [
            //       '.tmp/styles/{,*/}*.css',
            //       'styles/{,*/}*.css'
            //     ]
            //   }
            // }
        },
        htmlmin: {
          dist: {
            options: {
              /*removeCommentsFromCDATA: true,
              // https://github.com/yeoman/grunt-usemin/issues/44
              //collapseWhitespace: true,
              collapseBooleanAttributes: true,
              removeAttributeQuotes: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeOptionalTags: true*/
            },
            files: [{
              expand: true,
              // cwd: '',
              src: ['*.html', 'views/*.html'],
              dest: 'dist'
            }]
          }
        },
        uglify: {
            dist: {
                files: {
                    'dist/scripts/scripts.js': [
                        'dist/scripts/scripts.js'
                    ]
                }
            }
        }
    });

    grunt.registerTask('server', ['connect:livereload', 'open', 'watch']);

    grunt.registerTask('build', ['useminPrepare', 'htmlmin', 'concat', 'copy:dist', 'cssmin', 'uglify', 'usemin']);

    grunt.registerTask('default', ['server', 'build']);
};