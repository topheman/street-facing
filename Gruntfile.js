'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        config: {
            app: '' //root
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: '<%= config.app %>'
                }
            }
        },
        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>{,*/}*.html',
                    '<%= config.app %>css/{,*/}*.css',
                    '<%= config.app %>js/{,*/}*.js'
                ]
            }
        }
    });

    grunt.registerTask('serve', [
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('default', ['serve']);

    grunt.registerTask('build', function () {
        grunt.log.error('build task not yet implemented');//only to match yeoman gruntfiles
    });

};