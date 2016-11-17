module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Express Server
        express: {
            dev: {
                options: {
                    script: 'index.js',
                    port: 8000
                }
            }
        },

        // SASS Styling
        sass: {
            dev: {
                files: {
                    '_build/styles/styles.css': '_app/scss/styles.scss'
                },
                options: {
                    style: 'expanded'
                }
            }
        },

        // Watch for Updating Files
        watch : {
            // watch Sass files to rerun SASS and reload page
            css : {
                files: ['_app/scss/*.scss', '_app/scss/**/*.scss'],
                tasks: ['sass:dev'],
                option: {
                    livereload: true
                }
            },

            // watch Js files to reload page
            js : {
                files: ['_app/js/*.js'],
                tasks: ['copy:js'],
                option: {
                    livereload: true
                }
            },

            // watch template files to recompile and reload
            html : {
                files: ['_app/templates/*.html'],
                tasks: ['copy:html'],
                options: {
                    livereload: true
                }
            },

            // watch Sever files to rerun grunt-express-server and reload
            files : {
                files : [
                    'index.js'
                ],
                tasks : ['express:dev'],
                options : {
                    livereload: true,
                    spawn: false
                }
            }
        },

        // Copy images and other assets from _App to _Build
        copy : {
            dev: {
                files : [
                    { "cwd": "_app/js/", "src": ["**"], "dest": "_build/js", "expand": true },
                    { "cwd": "_app/scss/", "src": ["*.css"], "dest": "_build/styles", "expand": true },
                    { "cwd": "_app/images/", "src": ["**"], "dest": "_build/images", "expand": true },
                    { "cwd": "_app/gfx/", "src": ["**"], "dest": "_build/gfx", "expand": true },
                    { "cwd": "_app/templates/", "src": ["**"], "dest": "_build/", "expand": true },
                    { "cwd": "_app/templates/", "src": ["**"], "dest": "", "expand": true }
                ]
            },
            js: {
                files: [
                    { "cwd": "_app/js/", "src": ["**"], "dest": "_build/js", "expand": true }
                ]
            },
            html: {
                files: [
                    { "cwd": "_app/templates/", "src": ["**"], "dest": "_build/", "expand": true },
                    { "cwd": "_app/templates/", "src": ["**"], "dest": "", "expand": true }
                ]
            }
        }

    });

    // Load all NPM Tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-express-server');

    // Register Grunt Tasks
    grunt.registerTask('default', ['sass:dev', 'copy:dev', 'express:dev', 'watch']);
};