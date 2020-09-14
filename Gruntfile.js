module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),
        qunit: {
            browser: {
                options: {
                    timeout: 60000,
                    urls: [
                        'http://localhost:9000/test/simple.html',
                        'http://localhost:9000/test/simpleChaining.html'
                    ]
                }
            }
        },
        watch: {
            files: [ 'js/app/*.js', 'test/js/app/*.js' ],
            tasks: [ 'concat' ]
        },
        compress: {
            main: {
                options: {
                    archive: 'dist/<%= pkg.name %>-js_<%= grunt.template.today("yyyy-mm-dd_HHMM") %>.tar.gz',
                    pretty: true
                },
                expand: true,
                files: [
                    {
                        cwd: 'test/',
                        expand: true,
                        src: ['**/*', '!**/*~'],
                        dest: 'test'
                    }, 
                    {
                        cwd: 'js/',
                        expand: true,
                        src: ['**/*', '!**/*~'],
                        dest: 'js'
                    },
                    {
                        cwd: 'docs/',
                        expand: true,
                        src: ['**/*', '!**/*~'],
                        dest: 'docs'
                    },
                    {
                        src: ['changes.txt']
                    },
                    {
                        src: ['Gruntfile.js']
                    }, 
                    {
                        src: ['LICENSE']
                    }, 
                    {
                        src: ['package-lock.json']
                    },
                    {
                        src: ['package.json']
                    },
                    {
                        src: ['README.md']
                    }
                ]
            }
        },
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd HH:M:s") %> */\n'
            },
            dist: {
                src: [
                    'js/zzDOM.js', 
                    'js/simpleZZDom.js', 
                    'js/multipleZZDom.js',
                ],
                dest: 'build/zzDOM.js',
                nonull: true
            }
        },
        uglify: {
            standalone: {
                files: {
                    'build/zzDOM.min.js': [ 'build/zzDOM.js' ]
                }
            }
        },
        copy: {
            standalone: {
                src: 'build/zzDOM.js',
                dest: 'docs/lib/zzDOM.js'
            },
            standaloneMin: {
                src: 'build/zzDOM.min.js',
                dest: 'docs/lib/zzDOM.min.js'
            }
        },
        jshint: {
            all: [ 'Gruntfile.js', 'js/app/*.js', 'test/js/app/*.js' ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        exec: {
            check_node: 'node samples/js/app/node.js'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-exec');
    
    grunt.registerTask('test', ['qunit']);
    grunt.registerTask('default', ['concat']);
    grunt.registerTask('updateWeb', ['concat', 'uglify', 'copy:standaloneMin', 'copy:standalone']);
};
