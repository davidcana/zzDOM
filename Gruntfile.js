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
                        'http://localhost:9000/test/plugins-gcc.html',
                        'http://localhost:9000/test/simple-closures-concat.html',
                        'http://localhost:9000/test/multiple-closures-concat.html',
                        'http://localhost:9000/test/zz-closures-concat.html',
                        'http://localhost:9000/test/plugins-closures-concat.html',
                        'http://localhost:9000/test/simple-gcc-concat.html',
                        'http://localhost:9000/test/multiple-gcc-concat.html',
                        'http://localhost:9000/test/zz-gcc-concat.html',
                        'http://localhost:9000/test/plugins-gcc-concat.html',
                        'http://localhost:9000/test/multiple-gcc-debug.html',
                        'http://localhost:9000/test/plugins-gcc-debug.html',
                        'http://localhost:9000/test/simple-gcc-debug.html',
                        'http://localhost:9000/test/zz-gcc-debug.html'
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
                    'src/zzDOM-events.js',
                    'src/zzDOM-visible.js',
                    'src/zzDOM-utils.js',
                    'src/ss.js', 
                    'src/ss-events.js', 
                    'src/ss-visible.js', 
                    'src/ss-forms.js',
                    'src/ss-center.js',
                    'src/mm-closures.js',
                    'src/export.js'
                ],
                dest: 'build/zzDOM-closures.js',
                nonull: true
            },
            gcc: {
                src: [
                    'src/zzDOM.js', 
                    'src/zzDOM-events.js',
                    'src/zzDOM-visible.js',
                    'src/zzDOM-utils.js',
                    'src/ss.js', 
                    'src/ss-events.js', 
                    'src/ss-visible.js', 
                    'src/ss-forms.js',
                    'src/ss-center.js',
                    'src/mm-gcc.js',
                    'src/export.js'
                ],
                dest: 'build/zzDOM-gcc.js',
                nonull: true
            },
            'multiple-closures': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/multiple-closures.head.html',
                    'test/body/multiple.body.html'
                ],
                dest: 'test/multiple-closures.html',
                nonull: true
            },
            'multiple-closures-concat': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/multiple-closures-concat.head.html',
                    'test/body/multiple.body.html'
                ],
                dest: 'test/multiple-closures-concat.html',
                nonull: true
            },
            'multiple-gcc': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/multiple-gcc.head.html',
                    'test/body/multiple.body.html'
                ],
                dest: 'test/multiple-gcc.html',
                nonull: true
            },
            'multiple-gcc-concat': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/multiple-gcc-concat.head.html',
                    'test/body/multiple.body.html'
                ],
                dest: 'test/multiple-gcc-concat.html',
                nonull: true
            },
            'multiple-gcc-debug': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/multiple-gcc-debug.head.html',
                    'test/body/multiple.body.html'
                ],
                dest: 'test/multiple-gcc-debug.html',
                nonull: true
            },
            'plugins-closures': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugins-closures.head.html',
                    'test/body/plugins.body.html'
                ],
                dest: 'test/plugins-closures.html',
                nonull: true
            },
            'plugins-closures-concat': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugins-closures-concat.head.html',
                    'test/body/plugins.body.html'
                ],
                dest: 'test/plugins-closures-concat.html',
                nonull: true
            },
            'plugins-gcc': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugins-gcc.head.html',
                    'test/body/plugins.body.html'
                ],
                dest: 'test/plugins-gcc.html',
                nonull: true
            },
            'plugins-gcc-concat': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugins-gcc-concat.head.html',
                    'test/body/plugins.body.html'
                ],
                dest: 'test/plugins-gcc-concat.html',
                nonull: true
            },
            'plugins-gcc-debug': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/plugins-gcc-debug.head.html',
                    'test/body/plugins.body.html'
                ],
                dest: 'test/plugins-gcc-debug.html',
                nonull: true
            },
            'simple-closures': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/simple-closures.head.html',
                    'test/body/simple.body.html'
                ],
                dest: 'test/simple-closures.html',
                nonull: true
            },
            'simple-closures-concat': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/simple-closures-concat.head.html',
                    'test/body/simple.body.html'
                ],
                dest: 'test/simple-closures-concat.html',
                nonull: true
            },
            'simple-gcc': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/simple-gcc.head.html',
                    'test/body/simple.body.html'
                ],
                dest: 'test/simple-gcc.html',
                nonull: true
            },
            'simple-gcc-concat': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/simple-gcc-concat.head.html',
                    'test/body/simple.body.html'
                ],
                dest: 'test/simple-gcc-concat.html',
                nonull: true
            },
            'simple-gcc-debug': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/simple-gcc-debug.head.html',
                    'test/body/simple.body.html'
                ],
                dest: 'test/simple-gcc-debug.html',
                nonull: true
            },
            'zz-closures': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/zz-closures.head.html',
                    'test/body/zz.body.html'
                ],
                dest: 'test/zz-closures.html',
                nonull: true
            },
            'zz-closures-concat': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/zz-closures-concat.head.html',
                    'test/body/zz.body.html'
                ],
                dest: 'test/zz-closures-concat.html',
                nonull: true
            },
            'zz-gcc': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/zz-gcc.head.html',
                    'test/body/zz.body.html'
                ],
                dest: 'test/zz-gcc.html',
                nonull: true
            },
            'zz-gcc-concat': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/zz-gcc-concat.head.html',
                    'test/body/zz.body.html'
                ],
                dest: 'test/zz-gcc-concat.html',
                nonull: true
            },
            'zz-gcc-debug': {
                options: {
                    banner: '',
                    footer: '</html>\n'
                },
                src: [
                    'test/head/zz-gcc-debug.head.html',
                    'test/body/zz.body.html'
                ],
                dest: 'test/zz-gcc-debug.html',
                nonull: true
            }
        },
        uglify: {
            closures: {
                files: {
                    'build/zzDOM-closures.min.js': [ 'build/zzDOM-closures.js' ],
                    'build/zzDOM-events.min.js': [ 'src/zzDOM-events.js', 'src/ss-events.js' ],
                    'build/zzDOM-visible.min.js': [ 'src/zzDOM-visible.js', 'src/ss-visible.js' ],
                    'build/zzDOM-utils.min.js': [ 'src/zzDOM-utils.js' ],
                    'build/zzDOM-forms.min.js': [ 'src/ss-forms.js' ],
                    'build/zzDOM-center.min.js': [ 'src/ss-center.js' ]
                }
            },
            gcc: {
                files: {
                    'build/zzDOM-gcc.min.js': [ 'build/zzDOM-gcc.js' ]
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
                        'src/zzDOM-events.js',
                        'src/zzDOM-visible.js',
                        'src/zzDOM-utils.js',
                        'src/ss.js', 
                        'src/ss-events.js', 
                        'src/ss-visible.js', 
                        'src/ss-forms.js',
                        'src/ss-center.js',
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
                        'src/zzDOM-events.js',
                        'src/zzDOM-visible.js',
                        'src/zzDOM-utils.js',
                        'src/ss.js', 
                        'src/ss-events.js', 
                        'src/ss-visible.js', 
                        'src/ss-forms.js',
                        'src/ss-center.js',
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
                        'src/zzDOM-events.js',
                        'src/zzDOM-visible.js',
                        'src/zzDOM-utils.js',
                        'src/ss.js', 
                        'src/ss-events.js', 
                        'src/ss-visible.js', 
                        'src/ss-forms.js',
                        'src/ss-center.js',
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
                        'src/zzDOM-events.js',
                        'src/zzDOM-visible.js',
                        'src/zzDOM-utils.js',
                        'src/ss.js', 
                        'src/ss-events.js', 
                        'src/ss-visible.js', 
                        'src/ss-forms.js',
                        'src/ss-center.js',
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
                        'src/zzDOM-events.js',
                        'src/zzDOM-visible.js',
                        'src/zzDOM-utils.js',
                        'src/ss.js', 
                        'src/ss-events.js', 
                        'src/ss-visible.js', 
                        'src/ss-forms.js',
                        'src/ss-center.js',
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
                        'src/zzDOM-events.js',
                        'src/zzDOM-visible.js',
                        'src/zzDOM-utils.js',
                        'src/ss.js', 
                        'src/ss-events.js', 
                        'src/ss-visible.js', 
                        'src/ss-forms.js',
                        'src/ss-center.js',
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
    grunt.registerTask('default', ['concat:closures', 'concat:gcc', 'uglify', 'closure-compiler']);
    grunt.registerTask('buildTests', [
        'concat:multiple-closures', 
        'concat:multiple-closures-concat', 
        'concat:multiple-gcc',
        'concat:multiple-gcc-concat',
        'concat:multiple-gcc-debug',
        'concat:plugins-closures',
        'concat:plugins-closures-concat',
        'concat:plugins-gcc',
        'concat:plugins-gcc-concat',
        'concat:plugins-gcc-debug',
        'concat:simple-closures',
        'concat:simple-closures-concat',
        'concat:simple-gcc',
        'concat:simple-gcc-concat',
        'concat:simple-gcc-debug',
        'concat:zz-closures',
        'concat:zz-closures-concat',
        'concat:zz-gcc',
        'concat:zz-gcc-concat',
        'concat:zz-gcc-debug'
    ]);
    grunt.registerTask('updateWeb', ['concat', 'uglify', 'copy:standaloneMin', 'copy:standalone']);
    grunt.registerTask('all', ['default', 'buildTests', 'test']);
};
