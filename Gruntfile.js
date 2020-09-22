module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),
        qunit: {
            browser: {
                options: {
                    timeout: 60000,
                    urls: [
                        'http://localhost:9000/test/simple.html',
                        'http://localhost:9000/test/multiple.html',
                        'http://localhost:9000/test/zz.html',
                        'http://localhost:9000/test/plugins.html'
                    ]
                }
            }
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
                    'js/ss.js', 
                    'js/mm.js'
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
        'closure-compiler': {
            simple: {
                options: {
                    js: [
                        'build/zzDOM.js',
                        'test/js/app/htmlComparator.js',
                        'test/js/app/utils.js',
                        'test/js/app/simple.js'
                    ],
                    js_output_file: 'build/simple-tests.min.js',
                    compilation_level: 'SIMPLE',
                    create_source_map: 'build/simple-tests.min.js.map',
                    warning_level: 'VERBOSE',
                    output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=simple-tests.min.js.map',
                    debug: true,
                    externs: 'externs/qunit-2.11.2.js'
                }
            },
            sample: {
                options: {
                    js: [
                        'js/zzDOM.js', 
                        'js/ss.js', 
                        'js/mm.js',
                        'samples/sample.js'
                    ],
                    js_output_file: 'build/sample.min.js',
                    compilation_level: 'ADVANCED',
                    create_source_map: 'build/sample.min.js.map',
                    warning_level: 'VERBOSE',
                    output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=sample.min.js.map',
                    debug: true
                }
            },
            minimal: {
                options: {
                    js: [
                        'samples/minimal1.js',
                        'samples/minimal2.js'
                    ],
                    js_output_file: 'build/minimal.min.js',
                    compilation_level: 'ADVANCED',
                    create_source_map: 'build/minimal.min.js.map',
                    warning_level: 'VERBOSE',
                    output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=minimal.min.js.map',
                    debug: true
                }
            }
        },
        exec: {
            check_node: 'node samples/js/app/node.js'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-exec');
    
    require('google-closure-compiler').grunt(grunt, {
      platform: ['native', 'java', 'javascript'],
      max_parallel_compilations: require('os').cpus().length
    });
    //require('google-closure-compiler').grunt(grunt);
    // The load-grunt-tasks plugin won’t automatically load closure-compiler

    grunt.registerTask('test', ['qunit']);
    grunt.registerTask('default', ['concat']);
    grunt.registerTask('updateWeb', ['concat', 'uglify', 'copy:standaloneMin', 'copy:standalone']);
};
