module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),
        qunit: {
            browser: {
                options: {
                    timeout: 60000,
                    urls: [
                        'http://localhost:9000/test/simple-closures.html',
                        'http://localhost:9000/test/multiple-closures.html',
                        'http://localhost:9000/test/zz-closures.html',
                        'http://localhost:9000/test/plugins-closures.html',
                        'http://localhost:9000/test/simple-gcc.html',
                        'http://localhost:9000/test/multiple-gcc.html',
                        'http://localhost:9000/test/zz-gcc.html',
                        'http://localhost:9000/test/plugins-gcc.html'
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
                        cwd: 'docs/',
                        expand: true,
                        src: ['**/*', '!**/*~'],
                        dest: 'docs'
                    },
                    {
                        cwd: 'externs/',
                        expand: true,
                        src: ['**/*', '!**/*~'],
                        dest: 'externs'
                    },
                    {
                        cwd: 'samples/',
                        expand: true,
                        src: ['**/*', '!**/*~'],
                        dest: 'samples'
                    },
                    {
                        cwd: 'src/',
                        expand: true,
                        src: ['**/*', '!**/*~'],
                        dest: 'src'
                    },
                    {
                        cwd: 'test/',
                        expand: true,
                        src: ['**/*', '!**/*~'],
                        dest: 'test'
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
                        src: ['package.json']
                    },
                    {
                        src: ['package-lock.json']
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
            closures: {
                src: [
                    'src/zzDOM.js', 
                    'src/ss.js', 
                    'src/mm-closures.js'
                ],
                dest: 'build/zzDOM-closures.js',
                nonull: true
            },
            gcc: {
                src: [
                    'src/zzDOM.js', 
                    'src/ss.js', 
                    'src/mm-gcc.js'
                ],
                dest: 'build/zzDOM-gcc.js',
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
                        'src/zzDOM.js', 
                        'src/ss.js', 
                        'src/mm-gcc.js',
                        'test/src/app/htmlComparator.js',
                        'test/src/app/utils.js',
                        'test/src/app/simple.js'
                    ],
                    js_output_file: 'build/simple-tests.min.js',
                    compilation_level: 'ADVANCED',
                    create_source_map: 'build/simple-tests.min.js.map',
                    warning_level: 'VERBOSE',
                    output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=simple-tests.min.js.map',
                    debug: true,
                    externs: 'externs/qunit-2.11.2.js'
                }
            },
            multiple: {
                options: {
                    js: [
                        'src/zzDOM.js', 
                        'src/ss.js', 
                        'src/mm-gcc.js',
                        'test/src/app/htmlComparator.js',
                        'test/src/app/utils.js',
                        'test/src/app/multiple.js'
                    ],
                    js_output_file: 'build/multiple-tests.min.js',
                    compilation_level: 'ADVANCED',
                    create_source_map: 'build/multiple-tests.min.js.map',
                    warning_level: 'VERBOSE',
                    output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=multiple-tests.min.js.map',
                    debug: true,
                    externs: 'externs/qunit-2.11.2.js'
                }
            },
            zz: {
                options: {
                    js: [
                        'src/zzDOM.js', 
                        'src/ss.js', 
                        'src/mm-gcc.js',
                        'test/src/app/htmlComparator.js',
                        'test/src/app/utils.js',
                        'test/src/app/zz.js'
                    ],
                    js_output_file: 'build/zz-tests.min.js',
                    compilation_level: 'ADVANCED',
                    create_source_map: 'build/zz-tests.min.js.map',
                    warning_level: 'VERBOSE',
                    output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=zz-tests.min.js.map',
                    debug: true,
                    externs: 'externs/qunit-2.11.2.js'
                }
            },
            plugins: {
                options: {
                    js: [
                        'src/zzDOM.js', 
                        'src/ss.js', 
                        'src/mm-gcc.js',
                        'test/src/app/htmlComparator.js',
                        'test/src/app/utils.js',
                        'test/src/app/plugins.js'
                    ],
                    js_output_file: 'build/plugins-tests.min.js',
                    compilation_level: 'ADVANCED',
                    create_source_map: 'build/plugins-tests.min.js.map',
                    warning_level: 'VERBOSE',
                    output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=plugins-tests.min.js.map',
                    debug: true,
                    externs: [
                        'externs/qunit-2.11.2.js',
                        'externs/velocity.js'
                    ]
                }
            },
            'plugins-sample': {
                options: {
                    js: [
                        'src/zzDOM.js', 
                        'src/ss.js', 
                        'src/mm-gcc.js',
                        'samples/plugins-sample.js'
                    ],
                    js_output_file: 'build/plugins-sample.min.js',
                    compilation_level: 'ADVANCED',
                    create_source_map: 'build/plugins-sample.min.js.map',
                    warning_level: 'VERBOSE',
                    output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=plugins-sample.min.js.map',
                    debug: true,
                    externs: [
                        'externs/velocity.js'
                    ]
                }
            },
            sample: {
                options: {
                    js: [
                        'src/zzDOM.js', 
                        'src/ss.js', 
                        'src/mm-closures.js',
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
            check_node: 'node samples/src/app/node.js'
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
    grunt.registerTask('default', ['concat', 'closure-compiler']);
    grunt.registerTask('updateWeb', ['concat', 'uglify', 'copy:standaloneMin', 'copy:standalone']);
};
